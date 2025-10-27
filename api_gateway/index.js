const express = require('express');
const proxy = require('express-http-proxy');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// === Middleware ===

// Генерация или использование X-Request-ID
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || require('crypto').randomBytes(16).toString('hex');
  res.setHeader('X-Request-ID', req.id);
  next();
});

// CORS
app.use(cors());

// Ограничение частоты запросов (100 запросов в 15 минут)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Слишком много запросов' } },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Парсинг JSON
app.use(express.json());

const authenticate = (req, res, next) => {
  const publicPaths = [
    '/v1/users/api/auth/register',
    '/v1/users/api/auth/login'
  ];

  const route = (req.baseUrl || '') + (req.path || ''); 
  console.log(route);

  if (publicPaths.includes(route) && req.method === 'POST') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Требуется авторизация' } });
  }

  const token = authHeader.substring(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Недействительный токен' } });
  }
};

app.use('/v1/users', authenticate, proxy('http://user-service:3001', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['x-request-id'] = srcReq.id;

    const auth = srcReq.headers['authorization'];
    if (typeof auth === 'string' && auth.trim() !== '') {
      // ставим только если это строка и не пустая
      proxyReqOpts.headers['authorization'] = auth;
    } else {
      // явно удаляем если есть (чтобы не было undefined)
      delete proxyReqOpts.headers['authorization'];
    }

    return proxyReqOpts;
  }
}));

app.use('/v1/goods', authenticate, proxy('http://goods-service:3002', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['x-request-id'] = srcReq.id;

    const auth = srcReq.headers['authorization'];
    if (typeof auth === 'string' && auth.trim() !== '') {
      proxyReqOpts.headers['authorization'] = auth;
    } else {
      delete proxyReqOpts.headers['authorization'];
    }

    return proxyReqOpts;
  }
}));

// === Обработка 404 ===
app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Маршрут не найден' } });
});

// === Запуск ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway запущен на порту ${PORT}`);
});