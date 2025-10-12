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
import { Spinner } from "./ui/spinner";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // ✅ add this
        }
      );
      toast.success("Login successful!");
      console.log(response.data);
      navigate("/products");
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
      console.error("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <Card className="w-full max-w-sm mx-auto mt-10 bg-gray-900/90 backdrop-blur-md border border-purple-500/30 shadow-2xl text-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-300">
            Login to your account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email below to login to your account
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
                  autoComplete="email"
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
                  <Link
                    to="/resetPassword"
                    className="ml-auto inline-block text-sm text-purple-400 hover:text-purple-200"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
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
            {loading ? <Spinner /> : "Login"}
          </Button>
          <div className="text-sm text-gray-500">Don’t have an account?</div>
          <div>
            <Button
              variant="link"
              className="text-purple-400 hover:text-purple-200"
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
