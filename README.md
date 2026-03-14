# Pampers — Статья «Как выбрать подгузники»

Одностраничный SEO-оптимизированный editorial-материал уровня premium FMCG-бренда.

---

## Структура проекта

```
/
├── index.html      — основная страница
├── styles.css      — стили (premium editorial, mobile-first)
├── main.js         — минимальный JS (анимации, TOC, прогресс)
├── robots.txt      — инструкции для поисковиков
├── sitemap.xml     — карта сайта
└── README.md       — этот файл
```

---

## Быстрый старт

### Локально (любой static-сервер)

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code — Live Server extension
# Откройте index.html → правая кнопка → Open with Live Server
```

Откройте: `http://localhost:8000`

### Деплой

Любой хостинг статики: Netlify, Vercel, GitHub Pages, S3, Nginx.

```bash
# Netlify CLI
netlify deploy --prod --dir .

# Vercel
vercel --prod
```

---

## Где менять текст статьи

Весь текст находится в `index.html`. Основные секции:

| ID секции | Содержимое |
|-----------|-----------|
| `#quick-answer` | Блок «Главное за 30 секунд» |
| `#razmer` | Раздел про размеры + таблица |
| `#sostav` | Состав и материалы |
| `#vpityvaemost` | Дневные/ночные подгузники |
| `#trusiki` | Трусики-подгузники |
| `#gipoallergennye` | Гипоаллергенность и экологичность |
| `#fakty` | Блок ключевых фактов (цифры) |
| `#faq` | FAQ (вопросы/ответы) |
| `#vyvod` | Заключение |

---

## Где менять canonical URL

В `<head>` файла `index.html`:

```html
<!-- Строка ~13 -->
<link rel="canonical" href="https://pampers.ru/articles/kak-vybrat-podguzniki">
```

Также замените во всех `og:url`, `og:image`, `article:*` тегах и в `sitemap.xml`.

---

## Где обновлять schema.org и мета-теги

### Schema.org (JSON-LD)
В `<head>` → блок `<script type="application/ld+json">`.

Ключевые поля для обновления:
- `dateModified` — при каждом обновлении статьи
- `author.name` и `author.url` — данные автора
- `publisher.name` — название организации
- FAQ-вопросы в секции `@type: FAQPage`

### Open Graph
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

### Title и description
```html
<title>...</title>
<meta name="description" content="...">
```

---

## Где находятся технические файлы

| Файл | Расположение | Назначение |
|------|-------------|-----------|
| Structured data | `index.html` → `<script type="application/ld+json">` | Schema.org разметка |
| Canonical | `index.html` → `<link rel="canonical">` | Канонический URL |
| robots.txt | `/robots.txt` | Инструкции для краулеров |
| sitemap.xml | `/sitemap.xml` | Карта сайта |
| Microdata | В тегах статьи (`itemscope`, `itemprop`) | Яндекс-friendly разметка |

---

## SEO-элементы реализованы

- ✅ `<title>`, `<meta description>`, `<link rel="canonical">`
- ✅ Open Graph + Twitter Card
- ✅ Schema.org JSON-LD: Article, BreadcrumbList, Organization, Person, FAQPage
- ✅ Microdata (itemscope/itemprop) для совместимости с Яндексом
- ✅ Семантическая HTML-структура: `header`, `nav`, `main`, `article`, `section`, `aside`, `footer`
- ✅ Единственный `H1`, правильная вложенность H2/H3
- ✅ `robots.txt` + `sitemap.xml`
- ✅ `datePublished` + `dateModified` (видимо в тексте + в разметке)
- ✅ Автор, редактор, организация — в тексте и в структурированных данных
- ✅ FAQ с `FAQPage` schema + `<details>`/`<summary>` (индексируемо без JS)
- ✅ BreadcrumbList для поисковых сниппетов

---

## Производительность

- Основной текст в source HTML (не за JS)
- Нет тяжёлых библиотек
- Шрифты через `rel="preconnect"` + `display=swap`
- JS минимальный, загружается с `defer`
- Анимации через CSS + IntersectionObserver
- `prefers-reduced-motion` поддерживается
- FAQ работает через нативный `<details>` без JS
