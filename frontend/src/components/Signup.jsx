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
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      toast.success("Signup successful! Please login.");
      console.log(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Signup failed. Please try again.");
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
            Create your account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your details below to sign up and get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName" className="text-gray-300">
                  FirstName
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="john"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName" className="text-gray-300">
                  LastName
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="doe"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
          <div className="text-sm text-gray-500">Already having Account?</div>
          <div>
            <Button
              variant="link"
              className="text-purple-400 hover:text-purple-200"
              onClick={handleClick}
            >
              Log In
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
