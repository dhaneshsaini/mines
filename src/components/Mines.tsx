import React, { useEffect, useState } from "react";
import { FaBomb } from "react-icons/fa6";
import { GiCutDiamond } from "react-icons/gi";
import { playSound } from "./functions";

interface MinesArr {
  isHidden: boolean;
  isMine: boolean;
  opened: boolean;
}

const Mines: React.FC = () => {
  const [numberOfMines, setNumberOfMines] = useState<number>(1);
  const [betValue, setBetValue] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [minesArr, SetMinesArr] = useState<MinesArr[]>(
    new Array(25).fill({ isHidden: true, isMine: false, opened: false })
  );

  useEffect(() => {
    const newMinesArr: MinesArr[] = new Array(25).fill(null).map(() => ({
      isHidden: true,
      isMine: false,
      opened: false,
    }));

    const minesPositions = new Set<number>();

    while (minesPositions.size < numberOfMines) {
      minesPositions.add(Math.floor(Math.random() * newMinesArr.length));
    }

    minesPositions.forEach((pos) => {
      newMinesArr[pos].isMine = true;
    });

    SetMinesArr(newMinesArr);
  }, [numberOfMines]);

  function handleClickOnMines(index: number) {
    setIsInputDisabled(true);

    if (!minesArr[index].opened && !isGameOver) {
      setTimeout(() => {
        // show card onclick
        const updateMine = [...minesArr];
        updateMine[index].isHidden = false;
        updateMine[index].opened = true;

        SetMinesArr(updateMine);

        if (updateMine[index].isMine == true) {
          updateMine.map((item) => (item.isHidden = false));
          playSound(200);
          SetMinesArr(updateMine);
          setIsGameOver(true);
        } else {
          playSound(100);
        }
      }, 500);
    }
  }

  return (
    <section className="grid gap-5 place-items-center mt-20">
      <div className="grid gap-5 grid-cols-5 place-items-center">
        {minesArr.map((item, i) => (
          <div
            key={i}
            onClick={() => handleClickOnMines(i)}
            className={`w-16 h-16 text-4xl grid place-items-center drop-shadow ${
              item.opened
                ? "bg-zinc-100"
                : isGameOver
                ? "bg-zinc-200"
                : "bg-zinc-300 hover:bg-zinc-400 hover:-translate-y-1"
            } rounded cursor-pointer`}
          >
            {!item.isHidden ? (
              item.isMine ? (
                <FaBomb className="fill-zinc-900" />
              ) : (
                <GiCutDiamond
                  fontSize={item.opened ? 48 : 40}
                  className={item.opened ? "fill-rose-500" : "fill-rose-800"}
                />
              )
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      
      <div className="flex w-full max-w-md items-center justify-between mt-10">
        <div className="flex items-center gap-2">
          <label className="text-zinc-800" htmlFor="NumberOfMines">Mines</label>
          <select disabled={isInputDisabled} onChange={e => setNumberOfMines(Number(e.target.value))} value={numberOfMines} id="NumberOfMines" className="border-2 text-zinc-900 border-zinc-200 outline-none px-4 rounded bg-zinc-50 py-1 focus:border-zinc-400">
            {Array.from(Array(minesArr.length - 1).keys()).map((e) => (
              <option key={e} value={e + 1}>
                {e + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
            <label htmlFor="betamt">Bet Amount</label>
            <input className="border-2 text-zinc-900 border-zinc-200 outline-none px-4 rounded bg-zinc-50 py-1 focus:border-zinc-400" step={1} min={1} max={5000} type="number" id="betamt" value={betValue} onChange={e => setBetValue(Number(e.target.value))} />
        </div>
      </div>
    </section>
  );
};

export default Mines;
