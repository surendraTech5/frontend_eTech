import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Edit, Archive } from "lucide-react";

export default function CourseCard({ course }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="p-0">
                <div className="relative">
                    <img 
                        src="/placeholder-course.jpg" 
                        alt={course.courseName}
                        data-ai-hint="course cover"
                        className="rounded-t-lg aspect-video object-cover w-full h-48"
                    />
                    {!course.active && <Badge variant="destructive" className="absolute top-2 right-2">Inactive</Badge>}
                </div>
                <div className="p-4">
                    <Badge variant="secondary" className="mb-2">{course.subjects}</Badge>
                    <CardTitle className="text-lg">{course.courseName}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4"/>
                    <span>{course.price}</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2"/> Edit</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground"><Archive className="h-4 w-4 mr-2"/> Archive</Button>
                </div>
            </CardFooter>
        </Card>
    );
} 