import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface TeacherActionsProps {
  teacherId: string;
}

export default function TeacherActions({ teacherId }: TeacherActionsProps) {
  return (
    <div className="flex space-x-4">
      <Link href={`/teachers/${teacherId}/book`}>
        <Button className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Записаться на урок</span>
        </Button>
      </Link>
    </div>
  );
}
