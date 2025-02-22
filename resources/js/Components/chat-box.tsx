import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { Comment } from "@/types/types";
import { format } from "date-fns";
import { useForm, usePage, usePoll } from "@inertiajs/react";

export function ChatBox({ title = 'Chat box', comments, handleSubmit }: { title?: string, comments?: Comment[], handleSubmit?: (message: string, reset: () => void) => void}) {
    const { data, setData, post, processing, reset } = useForm({
        message: ""
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!data.message.trim()) return

        if(handleSubmit) {
            handleSubmit(data.message, reset)
        }
    }

    usePoll(5000)

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent
                className="space-y-4"
            >
                <div className="border list-chat min-h-[50px] rounded-xl p-4">
                    <div className="space-y-2">
                        {comments?.length ? comments?.map((comment, index) => (
                            <div className="flex gap-2 text-sm text-primary" key={index}>
                                <div className="flex-1 font-bold whitespace-nowrap sender">
                                    {comment.user.name} :
                                </div>
                                <div className="w-full font-light message">
                                    {comment.body}
                                    <span className="ml-2 text-xs font-medium">{format(comment.created_at, 'dd/MM/y, H:ii')}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-sm text-center chat-kosong text-muted-foreground">
                                ~ belum ada percakapan ~
                            </div>
                        )}
                    </div>
                </div>
                <form className="flex flex-col gap-4 form-message" onSubmit={onSubmit}>
                    <Textarea placeholder="Tulis pesan/balasan disini" value={data.message} onChange={(e) => setData('message', e.target.value)}/>
                    <div className="text-end">
                        <Button>
                            <SendHorizonal />
                            Kirim
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
