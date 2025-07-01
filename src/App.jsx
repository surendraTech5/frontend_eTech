import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import ConditionalLayout from '@/components/conditional-layout'
import { ColorThemeProvider } from '@/components/color-theme-provider'
import Dashboard from '@/pages/Dashboard'
import Courses from '@/pages/Courses'
import Subjects from '@/pages/Subjects'
import Lectures from '@/pages/Lectures'
import Users from '@/pages/Users'
import Profile from '@/pages/Profile'
import SampleForm from '@/pages/SampleForm'
import AuthSignIn from '@/pages/AuthSignIn'
import AuthSignUp from '@/pages/AuthSignUp'
import PrivateRoute from '@/components/PrivateRoute';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ColorThemeProvider>
        <Router>
          <ConditionalLayout>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
              <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
              <Route path="/lectures" element={<PrivateRoute><Lectures /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              
              <Route path="/sample-form" element={<PrivateRoute><SampleForm /></PrivateRoute>} />
              <Route path="/auth/signin" element={<AuthSignIn />} />
              <Route path="/auth/signup" element={<AuthSignUp />} />
            </Routes>
          </ConditionalLayout>
          <Toaster />
        </Router>
      </ColorThemeProvider>
    </ThemeProvider>
  )
}

export default App 