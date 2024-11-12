import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GopaySuccess() {
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-600 text-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="rounded-full bg-white p-2 mb-4">
          <Check className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-center mb-8">
          The amount has been successfully deducted from your display account
        </p>

        <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-30 flex flex-col justify-center items-center py-4">
          <p className="text-sm mb-4">
            Redirecting to Dashboard in {countdown} seconds, if not, then
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-transparent w-[150px] px-6 py-1 rounded-md border border-white font-semibold text-white"
          >
            Tap Here
          </button>
        </div>
      </div>
    </div>
  );
}
