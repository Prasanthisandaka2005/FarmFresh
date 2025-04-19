**Order Placement Application**
**Overview**
This is a simple and functional web application for placing product orders.
Users can select products, specify quantities, fill out their contact details, and submit an order.
The application ensures proper validations, handles important edge cases, and provides a smooth user experience.

**Features**
View available products.
Select and deselect products.
Specify the quantity for each selected product.
Submit contact information (name, phone, and address).
Place an order with proper validation.
Toast notifications for success and failure.
Edge case handling for empty selection and invalid quantities.
Integration with the backend API for order creation.

**Technologies Used**
React.js with TypeScript
Redux Toolkit (for product state management)
Axios (for API requests)
js-cookie (to manage user email from cookies)
Tailwindcss (for styling)
react-hot-toast (for toast notifications)

**How to Run Locally**
Clone the repository:
git clone https://github.com/your-username/your-repo.git
cd farmfresh-orders
npm install
npm run dev
Visit http://localhost:3000 to use the application.

**Folder Structure**
AGRO ASSIGNMENT/
└── farmfresh-orders/
    ├── libs/
    ├── public/
    ├── src/
    │   └── app/
    │       ├── admin/
    │       ├── api/
    │       ├── dashboard/
    │       ├── Loader/
    │       ├── login/
    │       ├── my-orders/
    │       ├── order-now/
    │       ├── orders/
    │       ├── signup/
    │       ├── favicon.ico
    │       ├── globals.css
    │       ├── layout.tsx
    │       ├── LayoutWrapper.tsx
    │       └── page.tsx
    ├── store/
    │   ├── index.ts
    │   ├── productsSlice.ts
    │   ├── userSlice.ts
    ├── utils/

**Known Limitations**
Responsiveness:
A full responsive design has not yet been implemented.
(Reason: Exams start on Monday.)

**Testing**
Verified that:
Products can be selected and quantities updated.
Orders are not placed without selecting products.
Quantities must be greater than zero.
API calls are successfully made and responses handled.
Edge cases, such as empty forms or invalid input, are managed.

**Future Improvements**
Make the UI fully responsive.
Add a better success/error UI after placing an order.
Enhance form validation (e.g., phone number validation).
