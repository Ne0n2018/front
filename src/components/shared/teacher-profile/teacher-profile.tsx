import { Teacher } from "@/type/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeacherProfileCardProps {
  teacher: Teacher;
}

export default function TeacherProfileCard({
  teacher,
}: TeacherProfileCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <CardTitle>{teacher.user.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Email:</strong> {teacher.user.email}
        </p>
        <p>
          <strong>Предметы:</strong> {teacher.subjects.join(", ")}
        </p>
        <p>
          <strong>Почасовая ставка:</strong> {teacher.hourlyRate} $/час
        </p>
        <p>
          <strong>О себе:</strong>{" "}
          {teacher.description || "Описание отсутствует"}
        </p>
      </CardContent>
    </Card>
  );
}
