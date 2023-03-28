import stylesBackground from "../../styles/participant/waitingForAnswers.module.css";
import styles from "../../styles/participant/joinPage.module.css";
import Image from "next/image";
import logo from "../../../public/luma_logo.png";
import { useState } from "react";
const JoinPage = () => {
    const submitJoining = () => {};
    const [gameCode, setGameCode] = useState("");
    const [userNick, setUserNick] = useState("");
    return (
        <div className="gradient-animation-1">
            <Image src={logo} alt="exit" className={styles.logo} />
            <div className={styles.formBackground}>
                <form className={styles.joinForm} onSubmit={submitJoining}>
                    <label for="game-code-input" className={styles.inpuLabel}>
                        KOD GRY
                    </label>
                    <input
                        type="text"
                        id="game-code-input"
                        name="game-code-input"
                        className={styles.inputJoin}
                        value={gameCode}
                        onChange={(e) => setGameCode(e.target.value)}
                    />
                    <label for="nick-input" className={styles.inpuLabel}>
                        NICK
                    </label>
                    <input
                        type="text"
                        id="nick-input"
                        name="nick-input"
                        className={styles.inputJoin}
                        value={userNick}
                        onChange={(e) => setUserNick(e.target.value)}
                    />
                    <input
                        type="submit"
                        className={styles.submitJoiningBtn}
                        value="DOŁĄCZ!"
                    />
                </form>
            </div>
        </div>
    );
};

export default JoinPage;