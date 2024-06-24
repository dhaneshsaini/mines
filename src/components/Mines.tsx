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
  // const [isGameOver, setIsGameOver] = useState<boolean>(false);
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

    if (!minesArr[index].opened) {
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
          // setIsGameOver(true);
        } else {
          playSound(100);
        }
      }, 1000);
    }
  }

  return (
    <section className="grid gap-5 bg-[#0f212e] place-items-center mt-20">
      <div className="grid gap-5 grid-cols-5 place-items-center">
        {minesArr.map((item, i) => (
          <div
            key={i}
            onClick={() => handleClickOnMines(i)}
            className={`w-16 h-16 text-4xl grid place-items-center ${
              item.opened ? "bg-[#071824]" : "bg-[#2f4553] hover:bg-[#496d83]"
            } rounded cursor-pointer hover:-translate-y-1`}
          >
            {!item.isHidden ? (
              item.isMine ? (
                <FaBomb className="fill-rose-600" />
              ) : (
                <GiCutDiamond
                  fontSize={item.opened ? 48 : 32}
                  className={item.opened ? "fill-lime-400" : "fill-lime-800"}
                />
              )
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <label
          className="text-lg text-gray-400 font-medium"
          htmlFor="NumberOfMines"
        >
          Mines
        </label>
        <input
          className="border-2 text-gray-100 border-[#2f4553] outline-none px-4 rounded bg-[#2f4553] py-1 focus:border-[#496d83]"
          min={1}
          value={numberOfMines}
          onChange={(e) => setNumberOfMines(Number(e.target.value))}
          max={minesArr.length - 1}
          type="number"
          id="NumberOfMines"
          disabled={isInputDisabled}
        />
      </div>
    </section>
  );
};

export default Mines;
