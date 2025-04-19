import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface BookingConfirmationProps {
  bookingId: string;
  teacherName: string;
  date: string;
}

export default function BookingConfirmation({
  bookingId,
  teacherName,
  date,
}: BookingConfirmationProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <span>Бронирование успешно</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Вы записались на урок с <strong>{teacherName}</strong> на{" "}
          <strong>{new Date(date).toLocaleString()}</strong>.
        </p>
        <p>
          ID бронирования: <strong>{bookingId}</strong>
        </p>
        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            Перейти в личный кабинет
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
