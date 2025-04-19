"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Teacher } from "@/type/type";
import ProtectedRoute from "@/components/shared/teacher-profile/protected-route";
import TeacherInfoSummary from "@/components/shared/teacher-profile/teacher-profile";
import BookingForm from "@/components/shared/teacher-booking/BookingForm";
import BookingConfirmation from "@/components/shared/teacher-booking/BookingConfirmation";
import { Loader2 } from "lucide-react";
import api from "@/apiClient/apiClient";

export default function TeacherBookingPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        setLoading(true);
        const response = await api.get(`/teachers/${id}`);
        setTeacher(response.data as Teacher);
      } catch (err) {
        setError("Не удалось загрузить данные репетитора");
        console.error("Error fetching teacher:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const handleBookingSuccess = (newBookingId: string, date: string) => {
    setBookingId(newBookingId);
    setBookingDate(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="container mx-auto p-4 text-center text-destructive">
        {error || "Репетитор не найден"}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Бронирование урока</h1>
        {bookingId && bookingDate ? (
          <BookingConfirmation
            bookingId={bookingId}
            teacherName={teacher.user.name}
            date={bookingDate}
          />
        ) : (
          <div className="space-y-6">
            <TeacherInfoSummary teacher={teacher} />
            <BookingForm
              teacherId={teacher.id}
              onBookingSuccess={(newBookingId) =>
                handleBookingSuccess(newBookingId, teacher.selectedDate!)
              }
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
