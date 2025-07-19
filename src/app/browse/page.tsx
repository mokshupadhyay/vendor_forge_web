import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface VendorType {
  id: number;
  title: string;
  price: number;
  rating: number;
  vendorName: string;
  image: string;
  instructorImage: string;
}

const Vendors: FC = () => {
  const isLoading: boolean = false;

  const vendors: VendorType[] = [
    {
      id: 1,
      title: "Vendor",
      price: 40000,
      rating: 2,
      vendorName: "Vijay",
      image: "vendor_1.jpg",
      instructorImage: "instructor.png",
    },
    {
      id: 22,
      title: "Vendor",
      price: 50000,
      rating: 2,
      vendorName: "Ram",
      image: "vendor_2.jpg",
      instructorImage: "instructor2.png",
    },
    {
      id: 3,
      title: "Company",
      price: 70000,
      rating: 3,
      vendorName: "Aman Pratap",
      image: "vendor_3.jpg",
      instructorImage: "instructor3.png",
    },
    {
      id: 4,
      title: "Vendor",
      price: 45000,
      rating: 4,
      vendorName: "Dheeraj Misra",
      image: "vendor_4.jpg",
      instructorImage: "instructor3.png",
    },
    {
      id: 5,
      title: "Client",
      price: 36000,
      rating: 5,
      vendorName: "Rahul Chakarvarti",
      image: "vendor_5.jpg",
      instructorImage: "instructor3.png",
    },
    {
      id: 6,
      title: "Vendor",
      price: 85000,
      rating: 4,
      vendorName: "Sankar Mohan",
      image: "vendor_6.jpg",
      instructorImage: "instructor3.png",
    },
    {
      id: 7,
      title: "Client",
      price: 95000,
      rating: 1,
      vendorName: "Akash Kumar",
      image: "vendor_7.jpg",
      instructorImage: "instructor3.png",
    },
    {
      id: 8,
      title: "Company",
      price: 42000,
      rating: 3,
      vendorName: "Lakhan Shyam",
      image: "vendor_8.jpg",
      instructorImage: "instructor3.png",
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">
          Trusted Partners for Your Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
              <VendorSkeleton key={index} />
            ))
            : vendors.map((vendor) => (
              <Vendor key={vendor.id} vendor={vendor} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Vendors;

const VendorSkeleton: FC = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

interface VendorProps {
  vendor: VendorType;
}

const Vendor: FC<VendorProps> = ({ vendor }) => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-0 cursor-pointer">
      <div className="relative">
        <Image
          src={`/${vendor.image}`}
          alt={vendor.title}
          width={500}
          height={200}
          className="w-full h-36 rounded-t-lg object-cover"
        />
      </div>
      <CardContent className="pt-0 px-4 pb-4">
        <h1 className="text-xl cursor-pointer font-bold text-lg truncate">
          {vendor.title}
        </h1>
        <div className="flex items-center justify-between mt-2 mb-1">
          <div className="flex items-center gap-1">
            <Avatar className="h-7 w-7">
              <AvatarImage src={vendor.instructorImage} alt={vendor.title} />
              <AvatarFallback>
                {vendor.vendorName ? vendor.vendorName.charAt(0) : "N/A"}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{vendor.vendorName}</h1>
          </div>
          <div className="flex">
            {Array.from({ length: Math.min(vendor.rating, 5) }).map(
              (_, index) => (
                <Image
                  key={index}
                  src="/star.png"
                  alt="star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-md font-semibold">₹{vendor.price}</div>
          <Button className="px-2 py-2 text-xs h-auto cursor-pointer">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};
