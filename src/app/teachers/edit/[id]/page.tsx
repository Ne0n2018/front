"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Teacher } from "@/type/type";
import TeacherProfileForm from "@/components/shared/teacher-form/TeacherProfileForm";
import { Loader2 } from "lucide-react";
import api from "@/apiClient/apiClient";

export default function TeacherProfileFormPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        setLoading(true);
        const response = await api.get(`/teachers/user/${id}`);
        setTeacher(response.data as Teacher);
      } catch (err) {
        setError("Не удалось загрузить данные репетитора");
        console.error("Error fetching teacher:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeacher();
  }, [id]);

  // Проверка роли пользователя
  const canEdit =
    user &&
    (user.role === "ADMIN" ||
      (user.role === "TEACHER" && teacher?.user.id === user.id));

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

  if (!canEdit) {
    return (
      <div className="container mx-auto p-4 text-center text-destructive">
        У вас нет прав для редактирования этого профиля
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Редактирование профиля</h1>
      <TeacherProfileForm teacher={teacher} />
    </div>
  );
}
