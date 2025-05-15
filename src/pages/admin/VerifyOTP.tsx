
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  
  // For demonstration purposes - in a real app this would verify with backend
  const DEMO_OTP = "123456";

  const handleVerify = () => {
    if (otp === DEMO_OTP) {
      toast.success("OTP verified successfully");
      navigate("/admin/change-password");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center py-4">
              <InputOTP 
                value={otp} 
                onChange={setOtp} 
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              onClick={handleVerify} 
              className="w-full"
              disabled={otp.length !== 6}
            >
              Verify Code
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">Didn't receive a code?</p>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => toast.info("A new code has been sent")}
              >
                Resend Code
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Back to reset request
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;
