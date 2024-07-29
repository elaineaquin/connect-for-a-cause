import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HelpCircle,
  Info,
  Book,
  MessageSquare,
  Paperclip,
  Star,
  Edit2,
  Headphones,
} from "lucide-react"; // Import icons from lucide-react or your preferred icon library
import React from "react";

const SupportAndFeedback = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Support And Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <HelpCircle className="me-2" /> Help Center
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Info className="me-2" /> Access FAQs
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Book className="me-2" /> User Guides
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <MessageSquare className="me-2" /> Contact Support
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Paperclip className="me-2" /> Submit a support ticket
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Headphones className="me-2" /> Live chat with support
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Star className="me-2" /> Feedback
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Edit2 className="me-2" /> Submit feedback about the app
        </Button>
        <Button
          className="w-full text-left flex items-center justify-start border border-gray-200"
          variant={"ghost"}
          size={"lg"}
        >
          <Edit2 className="me-2" /> Suggest new features
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportAndFeedback;
