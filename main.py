def on_button_pressed_a():
    DS3231.date_time(2022, 10, 30, 0, 20, 45, 0)
    music.play_tone(262, music.beat(BeatFraction.QUARTER))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_forever():
    pass
basic.forever(on_forever)
