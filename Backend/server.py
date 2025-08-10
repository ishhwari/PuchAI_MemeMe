from flask import Flask, request, send_file
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import os, tempfile

#go to the command promt and type "$env:GEMINI_API_KEY="paste_your_key_here""

app = Flask(__name__)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

def generate_meme_caption():
    # Replace with your Gemini API call
    captions = [
        "When you realize it's Monday again...",
        "Code finally works! 😂",
        "I test in production.",
        "Explaining bugs like a pro.",
        "Keep calm and code on."
    ]
    import random
    return random.choice(captions)

@app.route('/memeify', methods=['POST'])
def memeify():
    if 'image' not in request.files:
        return {"error": "No image uploaded"}, 400
    file = request.files['image']

    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        file.save(tmp.name)
        tmp_path = tmp.name

    caption = generate_meme_caption()

    image = Image.open(tmp_path).convert("RGBA")
    draw = ImageDraw.Draw(image)
    font_size = max(20, image.width // 15)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()

    text_width, text_height = draw.textsize(caption, font=font)
    x = (image.width - text_width) // 2
    y = image.height - text_height - 20

    for dx, dy in [(-1,-1),(1,-1),(-1,1),(1,1)]:
        draw.text((x+dx, y+dy), caption, font=font, fill="black")
    draw.text((x, y), caption, font=font, fill="white")

    img_io = BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)
    os.remove(tmp_path)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
