class GameController < ApplicationController
  def tictactoe; end

  def snake; end

  def space; end

  def index; end

  def concentration; end

  def dino; end

  def mastermind; end

  def flappybird; end

  def highscore
    score = params[:score]
    game = params[:game]
    Score.create!(score:, game:, user: current_user)
  end
end
