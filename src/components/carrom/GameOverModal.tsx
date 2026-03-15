import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Medal } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  winner: 'white' | 'black' | 'tie';
  whiteScore: number;
  blackScore: number;
  onPlayAgain: () => void;
}

export function GameOverModal({
  isOpen,
  winner,
  whiteScore,
  blackScore,
  onPlayAgain,
}: GameOverModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideClose>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            {winner === 'white' && (
              <>
                <Trophy className="h-8 w-8 text-yellow-500" />
                You Win!
              </>
            )}
            {winner === 'black' && (
              <>
                <Medal className="h-8 w-8 text-gray-500" />
                AI Wins!
              </>
            )}
            {winner === 'tie' && (
              <>
                <Medal className="h-8 w-8 text-blue-500" />
                It's a Tie!
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Game Over!
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className={`p-4 rounded-lg ${winner === 'white' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
            <div className="flex justify-center mb-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#eeeeee', border: '2px solid #ffffff' }}></div>
                <div className="absolute inset-[25%] rounded-full" style={{ backgroundColor: '#eeeeee', border: '2px solid #ffffff' }}></div>
              </div>
            </div>
            <div className="text-sm mb-1">White (You)</div>
            <div className="text-3xl">{whiteScore}</div>
          </div>

          <div className={`p-4 rounded-lg ${winner === 'black' ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
            <div className="flex justify-center mb-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#545454', border: '2px solid #151515' }}></div>
                <div className="absolute inset-[25%] rounded-full" style={{ backgroundColor: '#545454', border: '2px solid #151515' }}></div>
              </div>
            </div>
            <div className="text-sm mb-1">Black (AI)</div>
            <div className="text-3xl">{blackScore}</div>
          </div>
        </div>

        <Button
          onClick={onPlayAgain}
          className="w-full bg-[rgb(39,118,197)] hover:bg-[rgb(29,98,167)]"
          size="lg"
        >
          Play Again
        </Button>
      </DialogContent>
    </Dialog>
  );
}
