# TomboPrint Web Projesi

## Proje Hakkinda
TomboPrint — kurumsal baski yonetim platformu web sitesi.

## Teknoloji Stack
- **Frontend**: React 19 + Vite 8, react-router-dom v7, react-i18next, framer-motion, lucide-react
- **Backend**: Node.js + Express, SQLite (better-sqlite3), JWT (jsonwebtoken), bcrypt
- **Dil**: JSX (TypeScript yok)

## Proje Yapisi
```
tomboprint/
  index.html
  src/              # React frontend
    App.jsx         # Router + Layout
    main.jsx        # Entry point
    i18n.js         # TR/EN dil ayarlari
    context/        # AdminContext (state yonetimi)
    components/     # Navbar, Footer
    pages/          # Home, Features, Partners, Blog, About, Contact, Demo, SolutionDetail, Admin
    locales/        # tr/en translation JSON'lari
  backend/          # Express API server
    server.js       # Entry point
    db.js           # SQLite baglantisi + sema
    seed.js         # Admin kullanici seed
    middleware/
      auth.js       # JWT auth middleware
    routes/
      auth.js       # POST /api/auth/login
      sliders.js    # CRUD /api/sliders
      blog.js       # CRUD /api/blog
      about.js      # GET+PUT /api/about
      partners.js   # CRUD /api/partners
      contact.js    # POST /api/contact
      demo.js       # POST /api/demo
  public/           # Static assets
  dist/             # Build output
```

## Gelistirme Komutlari
```bash
# Frontend
npm run dev          # Vite dev server (port 5173)
npm run build        # Production build
npm run preview      # Build preview

# Backend
cd backend
npm run dev          # Nodemon dev server (port 3001)
npm start            # Production start
npm run seed         # Admin kullanici olustur
```

## Ortam Degiskenleri
- Frontend: `VITE_API_URL` (default: http://localhost:3001/api)
- Backend: `PORT`, `JWT_SECRET`, `DB_PATH`, `CORS_ORIGIN`

## Kurallar
- Turkce commit mesajlari ve yorumlar tercih edilir
- Admin sifresi .env'den alinir, hardcoded olmamali
- API endpoint'leri /api prefix'i ile baslar
- CRUD route'lari auth middleware ile korunur (GET haric)
- Frontend'te API istekleri src/api.js uzerinden yapilir
