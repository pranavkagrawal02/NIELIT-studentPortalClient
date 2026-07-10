import { Routes, Route } from 'react-router-dom';
import MainPage from '../studentPortal/MainPage.jsx';
import PlaceholderPage from '../pages/PlaceholderPage.jsx';
import AdminLogin from '../adminComponents/adminLogin.jsx';
import StudentLogin from '../studentComponents/studentLogin.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/about-us" element={<PlaceholderPage title="About Us" />} />
      <Route path="/about-us/vision" element={<PlaceholderPage title="Vision" />} />
      <Route path="/about-us/mission" element={<PlaceholderPage title="Mission" />} />
      <Route path="/about-us/director" element={<PlaceholderPage title="Director" />} />

      <Route path="/courses" element={<PlaceholderPage title="Courses" />} />
      <Route path="/courses/o-level" element={<PlaceholderPage title="O Level" />} />
      <Route path="/courses/a-level" element={<PlaceholderPage title="A Level" />} />
      <Route path="/courses/b-level" element={<PlaceholderPage title="B Level" />} />

      <Route path="/examinations" element={<PlaceholderPage title="Examinations" />} />
      <Route path="/examinations/notifications" element={<PlaceholderPage title="Notifications" />} />
      <Route path="/examinations/results" element={<PlaceholderPage title="Results" />} />
      <Route path="adminLogin" element={<AdminLogin/>} />
      <Route path="studentLogin" element={<StudentLogin/>} />

      <Route path="/downloads" element={<PlaceholderPage title="Downloads" />} />
      <Route path="/contact-us" element={<PlaceholderPage title="Contact Us" />} />

      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  );
}
