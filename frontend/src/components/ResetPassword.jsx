import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/resetPassword",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      toast.success("Password reset successful! Please login.");
      setTimeout(() => navigate("/login", { replace: true }), 1000);
      // Handle success (e.g., show a success message)
    } catch (error) {
      toast.error("Password reset failed. Please try again.");
      console.error("There was an error!", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <Card className="w-full max-w-sm mx-auto mt-10 bg-gray-900/90 backdrop-blur-md border border-purple-500/30 shadow-2xl text-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-300">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-400">
            Secure Your Account. Regain Your Access
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm text-purple-400 hover:text-purple-200"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 ">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold"
          >
            Reset Password
          </Button>
          {/* <div className="text-sm text-gray-500">Login ?</div>
          <div>
            <Button
              variant="link"
              className="text-purple-400 hover:text-purple-200"
              onClick={handleClick}
            >
              Login
            </Button>
          </div> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
