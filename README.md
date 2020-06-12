


### Feed 생성
```javascript
const createRichFeedTemplate = () => {
    const feed = new kakao.RichFeedAttachment();
    feed.readAttachment({
        'text': '안녕하세요',
    });
    return new kakao.AttachmentTemplate(feed, '{"feedType":10}');
};
````

### 사진 전송
```javascript
pic = fs.readFileSync('picture.jpg');
picAtt = await kakao.PhotoAttachment.fromBuffer(pic, 'picture.jpg', 698, 419);
att = new kakao.AttachmentTemplate(picAtt);
```

### 멘션
```javascript
const mention = new kakao.ChatMention(chat.sender);
chat.channel.sendText(mention);
```
