🖋️ Signature Injection Engine
    A prototype full-stack application that allows users to digitally sign PDF documents. This engine flawlessly bridges the gap between responsive web frontend (CSS Pixels, Top-Left origin) and static PDF backend (Points, Bottom-Left origin).

🚀 Features
1. Responsive Frontend EditorPDF Rendering: 
    . Uses react-pdf with worker support for high-performance rendering.
    . Drag & Drop: Flexible placement of signature fields anywhere on the document.
    . Responsive Scaling: Uses a percentage-based coordinate system ($xPct, yPct$) to ensure fields stay visually anchored to the same paragraph regardless of screen size (Mobile vs. Desktop).
    . Signature Pad: Integrated canvas-based pad to draw signatures with "Clear" and "Save" functionality.
2. "Burn-In" Backend Engine
    . Coordinate Transformation: Converts browser-relative percentages into PDF Points (72 DPI) with a flipped Y-axis (Bottom-Left origin).
    . Aspect Ratio Constraint: Automatically contains signatures within the user-defined box without stretching or distorting the image.
    . Security Layer: Calculates and stores SHA-256 hashes of the PDF before and after signing to create an immutable audit trail in MongoDB.

🛠️ Tech Stack
    Frontend: React.js, Vite, React-PDF, React-Draggable.
    Backend: Node.js, Express, PDF-Lib.
    Database: MongoDB (via Mongoose).
    Languages: TypeScript (Strict mode).

📋 Prerequisites
    Node.js (v18+)
    MongoDB Atlas account or local instance
    A sample PDF file named sample.pdf

⚙️ Installation & Setup

1. Clone the Repository
        git clone <your-repo-url>
        cd signature-injection-engine

2. Backend Configuration
    Navigate to the backend folder: cd backend
    Install dependencies: npm install
    Create a .env file in the backend/ root: 
        PORT=4000
        MONGODB_URI=your_mongodb_connection_string
        BACKEND_URL=http://localhost:4000
    Place a valid PDF named sample.pdf inside backend/uploads/.

3. Frontend Configuration
    Navigate to the frontend folder: cd ../frontend
    Install dependencies: npm install
    Create a .env file in the frontend/ root:
        VITE_BACKEND_URL=http://localhost:4000
    Place the same sample.pdf inside frontend/public/.

🏃 Running the Project
    Start Backend
        cd backend
        npm run dev
    The server will run at http://localhost:4000 and ensure the uploads/ directory is created.

    Start Frontend
        cd ../frontend
        npm run dev
    
    The app will be available at http://localhost:5173.

🧪 How to Use
    1. View PDF: The sample.pdf will load in the viewer.
    2. Position Field: Drag the "SIGN" box to your desired location. You can resize this box as needed.
    3. Draw Signature: Use the signature pad at the bottom to draw your signature and click Save Signature.
    4. Burn-In: Click Burn Signature into PDF.
    5. Verify: A new tab will open with the signed PDF located at backend/uploads/signed.pdf.

.

🔒 Audit Trail
    Every transaction is logged in MongoDB with:
        Original PDF Hash (SHA-256)
        Signed PDF Hash (SHA-256)
        Timestamp of signature