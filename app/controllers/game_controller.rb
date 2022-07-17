class GameController < ApplicationController
    def tictactoe

    end

    def snake

    end

    def space
        
    end

    def highscore
        score = params[:score]
        game = params[:game]
        Score.create!(score: score, game: game, user: current_user)
    end
end
