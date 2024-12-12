# Project: User Manager

## Description
This project is a user management application built with React, Redux, Vite, and Material-UI. It allows users to view, add, delete, and manage user information in a clean and responsive interface.

## Features
- View a list of users.
- Add new users locally (without affecting the API).
- Delete users locally (without affecting the API).
- Infinite scroll for user loading.
- Responsive design using Material-UI and CSS modules.
- Login functionality with username and password.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Redux**: For state management.
- **Vite**: Used for its fast build time and development server.
- **Material-UI (MUI)**: For a modern and responsive UI.
- **Axios**: For API requests.

## Why Vite?
Vite was chosen for this project because of its fast development server and optimized build process. Its simplicity and modern toolchain make it an excellent choice for React applications.

## Installation Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd user-manager
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview the production build**:
   ```bash
   npm run preview
   ```

## Login Instructions
Use the following credentials to log in to the application:
- **Username**: `admin`
- **Password**: `admin`

## Known Issues
- The testing suite is incomplete. Although tests were planned to be implemented using React Testing Library, they were not finalized due to time constraints.

## Future Improvements
1. **Complete Test Suite**:
    - Implement comprehensive unit and integration tests using React Testing Library.

2. **API Integration**:
    - Allow for real-time updates to the API when adding or deleting users.

3. **Improved Login**:
    - Enhance the login system with JWT-based authentication.

4. **Error Handling**:
    - Add robust error handling for API failures and form validation.

## Notes
- The project focuses on clean and maintainable code with proper folder structure.
- CSS modules are used for styling to avoid conflicts and provide scoped styles.

## Contributing
Feel free to fork this repository and submit a pull request for any improvements or features you'd like to add.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
Thank you for checking out this project! If you have any questions or feedback, feel free to reach out.