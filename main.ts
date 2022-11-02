input.onButtonPressed(Button.A, function () {
    if (DS3231.second() > 30) {
        minute = DS3231.minute() + 1
    } else {
        minute = DS3231.minute()
    }
    DS3231.dateTime(
    DS3231.year(),
    DS3231.month(),
    DS3231.date(),
    DS3231.day(),
    DS3231.hour(),
    minute,
    0
    )
    basic.showNumber(DS3231.minute())
    basic.showNumber(DS3231.second())
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(DS3231.temperatureUpper())
    basic.pause(5000)
})
let y = 0
let x = 0
let minute = 0
let s = DS3231.second()
let s_old = DS3231.second()
music.setVolume(32)
basic.forever(function () {
    s = DS3231.second()
    if (s != s_old) {
        s_old = s
        if (s == 0) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
        } else {
            if (s % 10 == 0) {
                music.playTone(523, music.beat(BeatFraction.Half))
            } else {
                music.playTone(131, music.beat(BeatFraction.Sixteenth))
            }
        }
        x = Math.floor(s / 5)
        y = s % 5
        basic.clearScreen()
        led.plot(x, y)
    }
})
