import styles from "../../styles/participant/questionPage.module.css";
import QuizAnswers from "@/components/participant/quizAnswers";
import { createAnswerLetters, calculateAnswerHeight } from "@/utils/answers";
import Image from "next/image";
import Link from "next/link";
import exitImageFile from "../../../public/exit.png";
import OpenAnswer from "@/components/participant/openAnswer";

const QuestionPage = () => {
    const answersQuantity = 4;
    const answers = createAnswerLetters(answersQuantity);
    const isAnswerBig = calculateAnswerHeight(answersQuantity);
    return (
        <>
            <Link href="/" className={styles.exitImageLink}>
                <Image
                    src={exitImageFile}
                    alt="exit"
                    className={styles.exitImage}
                />
            </Link>
            <div className={styles.questionPageContainer}>
                {/* <Link href="/" className={styles.exitImageLink}>
                <Image
                    src={exitImageFile}
                    alt="exit"
                    className={styles.exitImage}
                />
            </Link> */}
                <div className={styles.question}>
                    <div className={styles.questionText}>
                        Jaki jest najwyższy szczyt na świecie? Jaki jest
                        najwyższy szczyt na świecie? Jaki jest najwyższy szczyt
                        na świecie? Jaki jest najwyższy szczyt na świecie? Jaki
                        jest najwyższy szczyt na świecie?
                    </div>
                </div>
                <QuizAnswers
                    answerLetters={answers}
                    isAnswerBig={isAnswerBig}
                />
                {/* <OpenAnswer /> */}
            </div>
        </>
    );
};

export default QuestionPage;
