"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Loader2, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import api from "@/apiClient/apiClient";

interface BookingFormProps {
  teacherId: string;
  onBookingSuccess: (bookingId: string) => void;
}

export default function BookingForm({
  teacherId,
  onBookingSuccess,
}: BookingFormProps) {
  const { user } = useAuth();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedStartDate || !selectedEndDate || !user) {
      setError("Пожалуйста, выберите дату и убедитесь, что вы авторизованы");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const bookingData = {
        teacherId,
        startTime: selectedStartDate.toISOString(),
        endTime: selectedEndDate.toISOString(),
      };
      const response = await api.post("/bookings", bookingData);
      onBookingSuccess(response.data.id);
    } catch (err) {
      setError("Не удалось создать бронирование");
      console.error("Error creating booking:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Записаться на урок</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dateStart" className="block text-sm font-medium">
              Дата и время урока
            </label>
            <DatePicker
              selected={selectedStartDate}
              onChange={(date: Date) => setSelectedStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="dd/MM/yyyy HH:mm"
              minDate={new Date()}
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholderText="Выберите дату и время"
              required
            />
          </div>
          <div>
            <label htmlFor="dateEnd" className="block text-sm font-medium">
              Дата и время конца урока
            </label>
            <DatePicker
              selected={selectedEndDate}
              onChange={(date: Date) => {
                setSelectedEndDate(date);
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="dd/MM/yyyy HH:mm"
              minDate={new Date()}
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholderText="Выберите дату и время"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Бронирование...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Забронировать
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
