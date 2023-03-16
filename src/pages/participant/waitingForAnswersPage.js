import styles from "../../styles/participant/waitingForAnswers.module.css";
import { ClockLoader } from "react-spinners";

const waitingForAnswersPage = () => {
    const allParticipants = 5;
    const answerCount = 3;
    return (
        <div className="gradient-animation-1">
            <div className={styles.waitingLabel}>
                Oczekiwanie na pozostałych uczestników...
            </div>
            <div className={styles.loaderContainer}>
                <ClockLoader color="white" size={80} />
            </div>
            <div>
                <div className={styles.answerState}>
                    {answerCount}/{allParticipants}
                </div>
                <div className={styles.answerLabel}>ODPOWIEDZI</div>
            </div>
        </div>
    );
};

export default waitingForAnswersPage;
