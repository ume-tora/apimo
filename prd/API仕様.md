# API仕様書

## 1. 概要
本仕様書は、フロントエンドアプリケーションがヘッドレスCMS (Sanity) からコンテンツを取得するためのAPI（クエリ）を定義する。クエリ言語にはGROQ (Graph-Relational Object Queries) を使用する。

## 2. お知らせ (Post)

### 2.1. お知らせ一覧取得 API
- **概要:** 登録されているお知らせの一覧を取得する。トップページやお知らせ一覧ページで使用する。
- **リクエスト:**
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      excerpt
    }

- **レスポンス形式 (JSON):**
    [
      {
        "_id": "docId1",
        "title": "夏季休業のお知らせ",
        "slug": "summer-holiday-notice",
        "publishedAt": "2025-07-06",
        "mainImage": { ... },
        "excerpt": "誠に勝手ながら、以下の期間を夏季休業とさせていただきます。"
      },
      {
        "_id": "docId2",
        "title": "Webサイトをリニューアルしました",
        "slug": "website-renewal",
        "publishedAt": "2025-06-20",
        "mainImage": { ... },
        "excerpt": "平素より格別のご高配を賜り、厚く御礼申し上げます。"
      }
    ]

### 2.2. お知らせ詳細取得 API
- **概要:** スラッグを元に、単一のお知らせ記事の詳細データを取得する。
- **リクエスト:**
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      publishedAt,
      mainImage,
      body
    }
    ※ `$slug` には `summer-holiday-notice` のような具体的なスラッグが入る。
- **レスポンス形式 (JSON):**
    {
      "_id": "docId1",
      "title": "夏季休業のお知らせ",
      "publishedAt": "2025-07-06",
      "mainImage": { ... },
      "body": [ ... ] // リッチテキストのデータ
    }

## 3. イベント (Event)

### 3.1. イベント一覧取得 API
- **概要:** 登録されているイベントの一覧を取得する。
- **リクエスト:**
    *[_type == "event"] | order(eventDate desc) {
      _id,
      title,
      "slug": slug.current,
      eventDate,
      location,
      status
    }
- **レスポンス形式 (JSON):**
    [
      {
        "_id": "eventId1",
        "title": "Web開発セミナー",
        "slug": "web-dev-seminar-2025",
        "eventDate": "2025-08-10T14:00:00Z",
        "location": "オンライン (Zoom)",
        "status": "募集中"
      }
    ]

### 3.2. イベント詳細取得 API
- **概要:** スラッグを元に、単一のイベントの詳細データを取得する。
- **リクエスト:**
    *[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      eventDate,
      location,
      status,
      body,
      registrationUrl
    }
- **レスポンス形式 (JSON):**
    {
      "_id": "eventId1",
      "title": "Web開発セミナー",
      "eventDate": "2025-08-10T14:00:00Z",
      "location": "オンライン (Zoom)",
      "status": "募集中",
      "body": [ ... ], // リッチテキストのデータ
      "registrationUrl": "https://example.com/register"
    }