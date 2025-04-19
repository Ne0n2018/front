"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, Star } from "lucide-react";
import Link from "next/link";
import { Teacher } from "@/type/type";
import api from "@/apiClient/apiClient";

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const subjects = [
    "MATH",
    "ENGLISH",
    "PHYSICS",
    "BIOLOGY",
    "GEOGRAPHY",
    "RUSSIAN",
  ];

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const response = await api.get("/teachers", {
          subject: subjectFilter || undefined,
          page,
          limit,
        });
        console.log("API response:", response.data); // Отладка

        // Проверяем структуру ответа
        const data = response.data;
        if (Array.isArray(data)) {
          // Если API возвращает просто массив
          setTeachers(data);
          setTotalPages(Math.ceil(data.length / limit)); // Примерная оценка
        } else if (data && "teachers" in data && Array.isArray(data.teachers)) {
          // Если API возвращает объект { teachers, total }
          setTeachers(data.teachers);
          setTotalPages(Math.ceil(data.total / limit));
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError("Не удалось загрузить репетиторов");
        console.error("Error fetching teachers:", err);
        setTeachers([]); // Сбрасываем в пустой массив на случай ошибки
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, [subjectFilter, page]);

  // Вычисляем средний рейтинг из отзывов
  const getAverageRating = (reviews: Teacher["reviews"]) => {
    if (!reviews || reviews.length === 0) return "Нет отзывов";
    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return average.toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-destructive">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Список репетиторов</h1>

      {/* Фильтр по предметам */}
      <div className="mb-6 flex items-center space-x-4">
        <Select
          onValueChange={(value) => {
            setSubjectFilter(value === "ALL" ? null : value);
            setPage(1); // Сбрасываем страницу при изменении фильтра
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Фильтр по предмету" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Все предметы</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Список репетиторов */}
      {teachers.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Репетиторы не найдены
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <Card
              key={teacher.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{teacher.user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Предметы:</strong> {teacher.subjects.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Почасовая ставка:</strong> {teacher.hourlyRate} $/час
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Рейтинг:</strong>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {getAverageRating(teacher.reviews)}
                  </span>
                </p>
                <p className="text-sm mb-4">{teacher.description}</p>
                <Link href={`/teachers/${teacher.id}`}>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Подробнее</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-6">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Предыдущая
          </Button>
          <span className="self-center">
            Страница {page} из {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Следующая
          </Button>
        </div>
      )}
    </div>
  );
}
