
import { useState } from "react";
import { FileText, Search, Upload, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  files: string[];
  isOpen: boolean;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    {
      name: "Restaurant Documents",
      files: ["Agreements", "Menu Updates", "Discounts", "Restaurant Feedback"],
      isOpen: false,
    },
    {
      name: "Delivery Partner Documents",
      files: [
        "Proof of Identity",
        "Driving License",
        "Vehicle Registration Certificate",
        "Bank Account Details",
        "Bike Insurances",
      ],
      isOpen: false,
    },
    {
      name: "Legal Documents",
      files: [
        "Company Incorporation Documents",
        "Business Licenses",
        "Insurance Policies",
      ],
      isOpen: false,
    },
    {
      name: "Contracts and Agreements",
      files: [
        "User Terms and Conditions",
        "Delivery Partner Contracts",
        "Privacy Policy",
      ],
      isOpen: false,
    },
    {
      name: "Tax Documents",
      files: [
        "GST Bills",
        "Income Tax Docs",
        "Tax Invoices",
        "Withholding Tax",
      ],
      isOpen: false,
    },
    {
      name: "Complaints Documents",
      files: [
        "By Customers",
        "By Partners",
        "By Employers",
      ],
      isOpen: false,
    },
  ]);

  const toggleDocument = (index: number) => {
    setDocuments(documents.map((doc, i) => ({
      ...doc,
      isOpen: i === index ? !doc.isOpen : doc.isOpen,
    })));
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.files.some(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Handle file upload logic here
      console.log("File uploaded:", event.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img 
            src="/lovable-uploads/675472e9-98a0-4e08-9ccd-f4d2c4a028b0.png" 
            alt="Swiggy Logo" 
            className="h-12 w-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-center text-[#F97316] mb-8">
          Swiggy Documents
        </h1>

        {/* Search and Upload Section */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search documents..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                <Upload className="mr-2" size={20} />
                Upload Files
              </Button>
            </label>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border">
          {filteredDocuments.map((doc, index) => (
            <div key={doc.name} className="border-b last:border-b-0">
              <button
                onClick={() => toggleDocument(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="text-[#F97316]" size={20} />
                  <span className="font-medium text-gray-700">{doc.name}</span>
                </div>
                {doc.isOpen ? (
                  <ChevronDown className="text-gray-400" size={20} />
                ) : (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </button>
              {doc.isOpen && (
                <div className="bg-gray-50 px-6 py-3">
                  <ul className="space-y-2">
                    {doc.files.map((file) => (
                      <li
                        key={file}
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <FileText className="text-gray-400" size={16} />
                        <span className="text-gray-600">{file}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
