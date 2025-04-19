**Order Placement Application**

**Overview**

This is a simple and functional web application for placing product orders. Users can select products, specify quantities, provide contact details, and submit orders. The application includes proper validations, handles key edge cases, and ensures a smooth user experience.

**Features**

View available products, 
Select and deselect products, 
Specify quantities for each selected product, 
Submit contact information (name, phone, address), 
Place orders with proper validation, 
Toast notifications for success and failure, 
Edge case handling for empty selections and invalid quantities, 
Integration with the backend API for order creation.

**Technologies Used**

React.js with TypeScript: For building the frontend |  
Redux Toolkit: For product state management | 
Axios: For API requests | 
js-cookie: To manage user email from cookies | 
Tailwind CSS: For styling | 
react-hot-toast: For toast notifications | 

**How to Run Locally**

Clone the repository: 
git clone https://github.com/Prasanthisandaka2005/FarmFresh.git

Navigate to the project directory: 
cd farmfresh-orders

Install dependencies: 
npm install

Start the development server: 
npm run dev

Visit http://localhost:3000 to use the application.


**Known Limitations**

Responsiveness: Full responsive design is not yet implemented due to time constraints (exams starting on Monday).

**Testing**
The application has been verified to ensure:

Products can be selected and quantities updated || 
Orders cannot be placed without selecting products || 
Quantities must be greater than zero || 
API calls are successfully made, and responses are handled || 
Edge cases (e.g., empty forms, invalid inputs) are properly managed.

**Future Improvements**

Implement a fully responsive and improved UI, 
Enhance the success/error UI after order placement, 
Add advanced form validation (e.g., phone number validation).

