import { Teacher } from "@/type/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeacherInfoSummaryProps {
  teacher: Teacher;
}

export default function TeacherInfoSummary({
  teacher,
}: TeacherInfoSummaryProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{teacher.user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Предметы:</strong> {teacher.subjects.join(", ")}
        </p>
        <p>
          <strong>Почасовая ставка:</strong> {teacher.hourlyRate} $/час
        </p>
      </CardContent>
    </Card>
  );
}
