import { Teacher } from "@/type/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TeacherReviewsProps {
  teacher: Teacher;
}

export default function TeacherReviews({ teacher }: TeacherReviewsProps) {
  const getAverageRating = (reviews: Teacher["reviews"]) => {
    if (!reviews || reviews.length === 0) return "Нет отзывов";
    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return average.toFixed(1);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          Отзывы ({teacher.reviews.length}) - Средний рейтинг:{" "}
          {getAverageRating(teacher.reviews)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {teacher.reviews.length === 0 ? (
          <p className="text-muted-foreground">Отзывы отсутствуют</p>
        ) : (
          <ul className="space-y-4">
            {teacher.reviews.map((review) => (
              <li key={review.id} className="border-b pb-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{review.rating}/5</span>
                  <span className="text-sm text-muted-foreground">
                    от {review.user.name}
                  </span>
                </div>
                {review.comment && <p className="mt-2">{review.comment}</p>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
