"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const labTests = [
  { id: "lipid", name: "Lipid Profile" },
  { id: "thyroid", name: "Thyroid Test(s)" },
  { id: "cbc", name: "Complete Blood Count (CBC)" },
  { id: "pt", name: "Prothrombin Time (PT) with INR & Activated Partial Thromboplastin Time (PTT)" },
  { id: "glucose", name: "Glucose Test" },
  { id: "kidney", name: "Kidney Function Test" },
  { id: "liver", name: "Liver Function Test" },
  // Add more tests as needed
];

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BookLabTestPage() {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [additionalTests, setAdditionalTests] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleTestChange = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const handleProceed = () => {
    // Process the selected tests and additional info
    console.log("Selected Tests:", selectedTests);
    console.log("Additional Tests:", additionalTests);
    alert(`Booking initiated for ${selectedTests.length} tests.`);
  };

  useEffect(() => {
    gsap.fromTo(
      ".lab-test-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        onComplete: () => setAnimationComplete(true),
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          variants={fadeVariants}
          initial="hidden"
          animate={animationComplete ? "visible" : "hidden"}
        >
          Book a Lab Test
        </motion.h1>

        <motion.div
          ref={ref}
          className="lab-test-card"
        >
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Select Your Tests</CardTitle>
              <CardDescription className="text-gray-500">
                Choose the lab tests you need from the options below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {labTests.map((test) => (
                <div key={test.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={test.id}
                    checked={selectedTests.includes(test.id)}
                    onCheckedChange={() => handleTestChange(test.id)}
                  />
                  <Label htmlFor={test.id} className="cursor-pointer">
                    {test.name}
                  </Label>
                </div>
              ))}

              <div>
                <Label htmlFor="additionalTests">Additional Tests (if any):</Label>
                <Input
                  type="text"
                  id="additionalTests"
                  placeholder="Specify other tests"
                  value={additionalTests}
                  onChange={(e) => setAdditionalTests(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
            <div className="p-6">
              <Button onClick={handleProceed} className="w-full bg-blue-500 text-white">
                Proceed
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
