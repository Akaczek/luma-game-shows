import styles from "../../styles/participant/questionPage.module.css";
import QuizAnswers from "@/components/participant/quizAnswers";
import Image from "next/image";
import profilePic from "../../../public/exit.png";
import { createAnswerLetters } from "@/utils/answers";

const QuestionPage = () => {
    const answersQuantity = 3;
    const answers = createAnswerLetters(answersQuantity);

    return (
        <div className={styles.questionPageContainer}>
            <Image
                src={profilePic}
                alt="Picture of the author"
                className={styles.exitImage}
            />
            <div className={styles.question}>
                Jaki jest najwyższy szczyt na świecie?
            </div>
            <QuizAnswers />
        </div>
    );
};

export default QuestionPage;
