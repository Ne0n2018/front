"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  teacherSchema,
  TeacherFormData as FormDataType,
} from "@/lib/teacherSchema";
import { Teacher } from "@/type/type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/apiClient/apiClient";

interface TeacherProfileFormProps {
  teacher: Teacher;
}

const subjects = [
  "MATH",
  "ENGLISH",
  "PHYSICS",
  "BIOLOGY",
  "GEOGRAPHY",
  "RUSSIAN",
] as const;

export default function TeacherProfileForm({
  teacher,
}: TeacherProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormDataType>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      subjects: teacher.subjects || [],
      hourlyRate: teacher.hourlyRate || 0,
      description: teacher.description || "",
    },
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      setLoading(true);
      setError(null);
      // Обновление профиля репетитора
      await api.patch(`/teachers/user/${teacher.user.id}/profile`, {
        ...data,
      });
      router.push(`/teachers/${teacher.user.id}`);
    } catch (err) {
      setError("Не удалось сохранить данные");
      console.error("Error updating teacher:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Предметы</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={subject}
                        checked={field.value.includes(subject)}
                        onChange={(e) => {
                          const newSubjects = e.target.checked
                            ? [...field.value, subject]
                            : field.value.filter((s) => s !== subject);
                          field.onChange(newSubjects);
                        }}
                      />
                      <label htmlFor={subject}>{subject}</label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почасовая ставка ($/час)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Введите ставку"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Расскажите о себе" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
