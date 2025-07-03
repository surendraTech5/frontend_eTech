import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Edit,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Loader,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllUsers, updateUserDeatilss } from "../config/liveapi";
import { toast } from "react-toastify";

export default function Profile() {
  const { setTheme, theme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    profilePhoto: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userEmail = localStorage.getItem("userEmail");
        const res = await getAllUsers(token);
        if (res.success) {
          const user = res.users.find((u) => u.email === userEmail);
          if (user) setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUsers();
  }, []);

  const fullName = currentUser
    ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
    : "Guest";
  const email = currentUser?.email || "guest@example.com";
  const role = currentUser?.role || "user";
  const avatar =
    currentUser?.profilePhoto || "https://i.pravatar.cc/150?u=default";

  const handleOpen = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        profilePhoto: null,
      });
    }
    setOpen(true);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("phone", formData.phone);
      payload.append("gender", formData.gender);
      if (formData.profilePhoto) {
        payload.append("profilePhoto", formData.profilePhoto);
      }

      const result = await updateUserDeatilss(currentUser._id, payload, token);
      setCurrentUser(result.updatedUser);
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6 relative">
      {/* Header with theme switcher */}

      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={avatar}
            alt={fullName}
            className="w-24 h-24 rounded-full border-4 border-primary object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-1">{fullName}</h2>
            <div className="text-muted-foreground mb-1">{role}</div>
          </div>
          <div className="flex flex-row gap-2 mb-4 md:mb-0">
            <Button
              variant="outline"
              size="icon"
              className="border border-white text-white hover:border-primary hover:text-primary bg-transparent"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border border-white text-white hover:border-primary hover:text-primary bg-transparent"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border border-white text-white hover:border-primary hover:text-primary bg-transparent"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border border-white text-white hover:border-primary hover:text-primary bg-transparent"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleOpen}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardContent>
      </Card>
      {/* Personal Information */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">
              Personal Information
            </h3>
            {/* <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" />Edit</Button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1"> Name</div>
              <div className="font-medium">
                {currentUser?.firstName || "Not available"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Last Name
              </div>
              <div className="font-medium">
                {currentUser?.lastName || "Not available"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Email address
              </div>
              <div className="font-medium">{email}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Phone</div>
              <div className="font-medium">
                
                +91 {currentUser?.phone || "Not available"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Bio</div>
              <div className="font-medium">
                {currentUser?.bio || "No bio added yet"}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Gender</div>
              <div className="font-medium">
                {currentUser?.gender
                  ? currentUser.gender.charAt(0).toUpperCase() +
                    currentUser.gender.slice(1).toLowerCase()
                  : "Not specified"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 md:col-span-2">
              <Label>First Name</Label>
              <InputField
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Last Name</Label>
              <InputField
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Email</Label>
              <InputField
                value={formData.email}
                disabled
                className="bg-background text-foreground opacity-70 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Phone</Label>
              <InputField
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Gender</Label>
              <select
                className="w-full border border-input bg-background text-foreground rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, profilePhoto: e.target.files[0] })
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-4 w-4" />
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const InputField = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}) => (
  <div className="space-y-1">
    <Label className="block text-sm">{label}</Label>
    <Input
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className || "bg-background text-foreground border-input"}
    />
  </div>
);
