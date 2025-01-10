# 🌟 **MeiersBook Client**

The **frontend** of MeiersBook, a dynamic social media platform where users can share posts, interact with others, and manage their profiles seamlessly. Designed with cutting-edge technologies, MeiersBook delivers a smooth, responsive, and engaging user experience.

---

## 🛠️ **Key Features**

- 🔑 **Secure User Authentication**: Login, signup, and Google OAuth integration.
- 📝 **Comprehensive Post Management**: Create, edit, delete, like, comment, and view posts with live updates.
- 🌟 **Responsive Design**: Optimized for all devices with CSS modules and media queries.
- ⚙️ **Settings and Profile Management**:
  - Update personal details and profile pictures.
  - Manage account settings.
  - Theme toggler for light and dark modes.
- 👩‍💻 **Admin Panel**:
  - Manage users and posts with powerful admin tools.
  - Delete all posts in critical cases.
- ⚡ **Fast Interaction**: Optimized API integration using React Query with caching and mutation functions.

---

## 🧪 **Tech Stack**

| **Technology**   | **Description**              |
| ---------------- | ---------------------------- |
| **React**        | Component-based UI framework |
| **React Router** | Client-side routing          |
| **React Query**  | Data fetching & caching      |
| **Vite**         | High-performance build tool  |
| **CSS Modules**  | Scoped modular styling       |
| **GitHub Pages** | Deployment platform          |

---

## 🚀 **Getting Started**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/meierrene/meiersbook-client.git
cd meiersbook-client
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Set Environment Variables**

Create a `.env` file and add:

```bash
VITE_API_URL=https://strict-jemimah-meierrene-88607bf0.koyeb.app/api/v1
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### **4️⃣ Run the Development Server**

```bash
npm run dev
```

---

## 📁 **Project Structure**

```plaintext
src/
├── contexts/       # Global state management (Auth & Theme)
├── features/       # Modular feature-based components
│   ├── posts/      # Post CRUD operations
│   ├── users/      # User management and settings
│   ├── admin/      # Admin tools
├── pages/          # Route-specific pages
├── ui/             # Reusable UI components
├── utils/          # Helpers and constants
├── App.jsx         # Application entry point
└── main.jsx        # Root renderer
```

---

## 📸 **Screenshots**

**Homepage**

![homepage](https://github.com/user-attachments/assets/4e0a0e3d-2c58-4c6a-8edb-1246c34361a4)

**Add post**

![add](https://github.com/user-attachments/assets/6a9c2f53-a74b-4301-bca4-29636dc19b50)

**My posts**

![myposts](https://github.com/user-attachments/assets/4b1eb795-cedd-4f80-8351-0d29690067b5)

**Setting**

![settings](https://github.com/user-attachments/assets/290ba0aa-19e9-468e-9fc5-5386ed1c8c81)

**Update post**

![update](https://github.com/user-attachments/assets/97b0ae35-8dfb-4b5c-af3a-445cd2103f90)

---

## 🧥 **Contributing**

We welcome contributions!

- Fork the repository.
- Create a feature branch:

```bash
git checkout -b feature/feature-name
```

- Submit a pull request for review.

---

## 🔗 **Related Repositories**

### **README for `meiersbook-api`**

For the API documentation and setup, please refer to the [MeiersBook API Repository](https://github.com/meierrene/meiersbook-api).
