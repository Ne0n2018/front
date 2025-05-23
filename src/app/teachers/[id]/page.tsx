"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Teacher } from "@/type/type";
import TeacherProfileCard from "@/components/shared/teacher-profile/teacher-profile";
import TeacherReviews from "@/components/shared/teacher-profile/Teacher-reviews";
import TeacherActions from "@/components/shared/teacher-profile/Teacher-actions";
import { Loader2 } from "lucide-react";
import api from "@/apiClient/apiClient";
import { useAuth } from "@/context/AuthContext";

export default function TeacherProfilePage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

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
    if (id) {
      fetchTeacher();
    }
  }, [id]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Профиль репетитора</h1>
      <div className="space-y-6">
        <TeacherProfileCard teacher={teacher} />
        <TeacherReviews teacher={teacher} />
        <TeacherActions teacherId={teacher.id} />
      </div>
    </div>
  );
}
