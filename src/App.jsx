import { useState, useRef, useEffect } from "react";

const DOCTOR_PHOTO = "data:image/jpeg;base64,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";

const SYSTEM_PROMPT = `أنت مساعد ذكي لعيادة د. محمد حسام الدين عبد المنعم، استشاري الطب النفسي وعلاج الإدمان.

مهمتك: مساعدة المرضى وذويهم بطريقة دافئة ومهنية، وتشجيعهم على الحجز سواء حضورياً أو أونلاين.

═══════════════════════════
السيرة الذاتية والمؤهلات
═══════════════════════════
- الاسم: د. محمد حسام الدين عبد المنعم
- التخصص: استشاري الطب النفسي وعلاج الإدمان
- درجة الماجستير في الطب النفسي 2010 من جامعة عين شمس بتقدير ممتاز مع مرتبة الشرف
- درجة الدكتوراه في الطب النفسي 2015 من جامعة عين شمس بتقدير ممتاز مع مرتبة الشرف
- حاصل على لقب كبير الاستشاريين في الطب النفسي وعلاج الإدمان من النقابة العامة للأطباء
- استشاري نفسي في معهد الطب النفسي – جامعة عين شمس
- رئيس وحدة الإدمان في مستشفى نفسي
- مدير طبي لمستشفى الطب النفسي منذ 2017
- خبرة أكثر من 16 سنة في الطب النفسي
- شارك في مؤتمرات دولية عديدة للاطلاع على أحدث التطورات في الطب النفسي
- الموقع الشخصي: https://linktr.ee/dr.mohamedhossam

═══════════════════════════
معلومات العيادة (كشف حضوري)
═══════════════════════════
- قيمة الكشف: 1200 جنيه
- العنوان: التجمع الخامس – مركز خدمات جنوب الأكاديمية، بجوار أكاديمية حياة ومسجد حسن الشربتلي، الدور الأرضي – عيادة 12
- تليفون الحجز: 01553002461

مواعيد العيادة:
- السبت: 12 ظهرًا – 4 عصرًا | 4 عصرًا – 8 مساءً
- الأحد: 2 ظهرًا – 7 مساءً
- الإثنين: 12 ظهرًا – 4 عصرًا | 4 عصرًا – 8 مساءً
- الثلاثاء: 12 ظهرًا – 4 عصرًا | 4 عصرًا – 8 مساءً
- الأربعاء: 2 ظهرًا – 7 مساءً
- الخميس: 10 صباحًا – 2 ظهرًا
- الجمعة: إجازة

═══════════════════════════
جلسات أونلاين (للعرب في الخارج)
═══════════════════════════
الدكتور يقدم جلسات علاج نفسي أونلاين للمرضى العرب المقيمين في الدول الأجنبية، ممن يفضلون الحديث بلغتهم الأم ويحتاجون فهماً عميقاً للجانب الثقافي والديني في العلاج.
- متاح لجميع الدول العربية وجاليات المهجر
- مرونة في المواعيد تناسب الفروق الزمنية
- جلسات آمنة وسرية تماماً
- فهم عميق للهوية العربية والدين والقيم الأسرية
- الحجز عبر واتساب أو اتصال: 01553002461

═══════════════════════════
الأعراض والحالات التي يعالجها
═══════════════════════════
- الاكتئاب والقلق والتوتر
- اضطراب ثنائي القطب
- الوسواس القهري (OCD)
- اضطرابات النوم والأرق
- الإدمان بأنواعه (مخدرات، كحول، إدمان إباحية، إدمان رقمي)
- الفصام والاضطرابات الذهانية
- اضطرابات الشخصية الحدية والمتعددة
- تبدد الشخصية
- الانفصام
- مشاكل الغضب والانفعال
- مشاكل العلاقات الزوجية والعاطفية
- الاحتراق النفسي
- صدمات الغربة والهجرة والاغتراب
- مشاكل الهوية الجنسية
- أعراض نفسية جسدية
- كثرة التفكير وعدم وجود حافز
- تشتت الانتباه والسرحان
- الأذية النفسية والصدمات

═══════════════════════════
آراء المرضى (تقييمات حقيقية)
═══════════════════════════
⭐⭐⭐⭐⭐ Amir J: "دكتور في غاية الرقي والعلم ومستمع أكثر من ممتاز، بشوش وبيخليك تحس بالاطمئنان وتقول كل اللي جواك بدون مقاطعة"
⭐⭐⭐⭐⭐ Ingi Soufraki: "المكان جميل وعصري ونظيف، واحترافية الدكتور لا مثيل لها، تفانيه مع مرضاه لا يضاهيه أي دكتور قابلته"
⭐⭐⭐⭐⭐ هيثم السعيد: "الدكتور فاهم كويس خطوات العلاج ومستمع جيد وبيديني فرصة اتكلم عن مشاكلي"
⭐⭐⭐⭐⭐ Abdullah Adel: "قمت بزيارة العيادة.. وعن تجربة المكان استطيع الوثوق به والاعتماد عليه"
⭐⭐⭐⭐⭐ Ahmed Aql: "دكتور ممتاز جداً وحقيقي محترم وفعلاً مريح"
⭐⭐⭐⭐⭐ Mahmoud Elnamy: "I had an excellent experience. Very recommended"
⭐⭐⭐⭐⭐ عبد I: "دكتور كويس جداً"

═══════════════════════════
برنامج كسر دائرة التفكير المفرط
═══════════════════════════
اسم الكتاب: "التعامل مع التفكير المفرط"
الكتاب معاه فيديوهات شرح خطوة بخطوة

الباقات المتاحة:

1️⃣ الباقة الأساسية - 299 جنيه
📘 الكتاب فقط
رابط الكتاب: https://designrr.page/?i=2724449&t=3536241129

2️⃣ الباقة المتوسطة - 799 جنيه (الأكثر مبيعًا ⭐)
📘 الكتاب + 🎥 فيديوهات الشرح
رابط الكتاب: https://designrr.page/?i=2724449&t=3536241129
رابط الفيديوهات: https://www.tella.tv/video/altfkyr-almfrt-overthinking-4k8m

3️⃣ الباقة المتقدمة - 1500 جنيه
📘 الكتاب + 🎥 الفيديوهات + 🧠 تواصل واتساب بلا حدود مع د. حسام
رابط الكتاب: https://designrr.page/?i=2724449&t=3536241129
رابط الفيديوهات: https://www.tella.tv/video/altfkyr-almfrt-overthinking-4k8m
+ تواصل مباشر مع الدكتور على واتساب

طريقة الدفع:
- عن طريق InstaPay على الرقم: 01066596031
- بعد الدفع، يبعت العميل screenshot التحويل على واتساب: 01553002461
- وهيتبعتله الروابط فوراً

كيف تتعامل مع العميل المهتم بالكتاب:
1. اشرح له الباقات الثلاث بإيجاز
2. انصحه بالباقة المتوسطة (الأكثر مبيعاً)
3. لما يختار، قوله يحول المبلغ على InstaPay: 01066596031
4. بعد التحويل يبعت screenshot على واتساب: 01553002461
5. وهيستلم الروابط فوراً

رسالة ما بعد الدفع:
"مرحباً 🌿 شكراً لاهتمامك ببرنامج كسر دائرة التفكير المفرط.
يمكنك الآن البدء من خلال:
📘 تحميل كتاب التمارين: https://designrr.page/?i=2724449&t=3536241129
🎥 فيديوهات الشرح: https://www.tella.tv/video/altfkyr-almfrt-overthinking-4k8m
نصيحة: ابدأ بالتمرين الأول واتبع التمارين بالترتيب للحصول على أفضل نتيجة 💙"

═══════════════════════════
روابط التواصل والسوشيال ميديا
═══════════════════════════
- الموقع الشخصي وكل السوشيال ميديا ولينكد إن: https://linktr.ee/dr.mohamedhossam
- واتساب/اتصال: 01553002461
- جلسات أونلاين عبر زووم أو تطبيق داوي

═══════════════════════════
أسئلة شائعة وإجاباتها
═══════════════════════════
س: أنا حاسس بتوتر وقلق مستمر، أبدأ منين؟
ج: أول خطوة إنك تطلب تقييم نفسي مبدئي. هنفهم فيه طبيعة حالتك ونحدد أنسب طريقة للعلاج — سواء جلسات، دواء، أو دعم معرفي سلوكي. تواصل معنا على 01553002461

س: بتتعاملوا مع كل الحالات النفسية؟
ج: نعم، بنستقبل جميع الحالات النفسية ما عدا الأطفال. بنشتغل مع المراهقين والبالغين والأسر.

س: الجلسة بتاخد قد إيه؟
ج: الجلسة بتكون 60 دقيقة كاملة — وقت كافي نفهمك ونساعدك بدون استعجال.

س: ينفع أعمل الجلسة أونلاين؟
ج: طبعاً! بنوفر جلسات أونلاين عبر زووم أو تطبيق داوي، بشكل آمن وسري ومريح من بيتك.

س: لو حالتي مستعجلة؟
ج: متاح جلسات طوارئ نفسية بنفس اليوم — اتصل على طول: 01553002461

س: لو محتاج تقرير طبي؟
ج: بنوفر تقارير طبية معتمدة عند الحاجة، سواء للعمل أو السفر أو الدراسة.

س: أنا عايش بره مصر، ينفع أتابع؟
ج: بالتأكيد! بنشتغل مع مرضى من الخليج وأوروبا وأمريكا، والجلسات الأونلاين بتراعي فروق التوقيت واللغة.

═══════════════════════════
أسلوب الرد
═══════════════════════════
- تكلم بالعربية دائماً
- كن دافئاً ومتعاطفاً ومهنياً
- لا تقدم تشخيصات طبية محددة
- إذا سأل عن أعراض معينة، اشرح بإيجاز وطمئنه أن الدكتور يتعامل مع هذه الحالات
- إذا سأل عن الخبرة أو المؤهلات، اشرح بثقة وفخر
- إذا كان المريض من الخارج، رحب به وأخبره بخيار الأونلاين
- إذا كانت الحالة طارئة أو فيها خطر على النفس، أحل فوراً للتواصل مع الطبيب أو الطوارئ
- ردودك مختصرة وواضحة (3-5 جمل)
- ذكّر بإمكانية الحجز على 01553002461 في نهاية معظم الردود`;

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const quickReplies = [
  "أنا حاسس بقلق مستمر",
  "عايز أعرف عن الكتاب",
  "هل في جلسات أونلاين؟",
  "ما هي مواعيد العيادة؟",
  "كيف أحجز موعد؟",
  "كم سعر الكشف؟",
];

export default function DrHossamChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلاً وسهلاً 👋\nأنا المساعد الذكي لعيادة د. محمد حسام الدين عبد المنعم، استشاري الطب النفسي وعلاج الإدمان.\n\nكيف أقدر أساعدك النهارده؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const allMessages = [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: "model", 
          parts: [{ text: "فهمت! أنا مساعد د. محمد حسام وهساعد المرضى." }]
        },
        ...newMessages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }))
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: allMessages,
            generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
          }),
        }
      );

      const data = await response.json();
      if (data?.error) {
        setMessages([...newMessages, { role: "assistant", content: "عذرًا، حدث خطأ. اتصل بينا على 01553002461" }]);
      } else {
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "عذرًا، حاول مرة تانية.";
        setMessages([...newMessages, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "عذرًا، في مشكلة في الاتصال. اتصل بينا على 01553002461" }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a1628 0%, #0d2444 50%, #0a1f3a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "\'Noto Naskh Arabic\', \'Cairo\', serif", padding: "16px" }}>
      <style>{`
        @import url(\'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap\');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(100,160,255,0.3); border-radius: 4px; }
        .chat-window { width: 100%; max-width: 480px; background: rgba(255,255,255,0.04); backdrop-filter: blur(24px); border: 1px solid rgba(100,160,255,0.15); border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.5); display: flex; flex-direction: column; height: 90vh; max-height: 700px; }
        .header { background: linear-gradient(135deg, #1a3a6b 0%, #0e2a52 100%); padding: 20px 20px 16px; border-bottom: 1px solid rgba(100,160,255,0.1); }
        .avatar { width: 52px; height: 52px; border-radius: 50%; border: 2px solid rgba(100,160,255,0.4); box-shadow: 0 4px 16px rgba(37,99,235,0.4); overflow: hidden; flex-shrink: 0; }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .online-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #0a1628; position: absolute; bottom: 0; left: 0; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.2);opacity:0.8} }
        .messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .bubble-wrap { display: flex; gap: 8px; align-items: flex-end; }
        .bubble-wrap.user { flex-direction: row-reverse; }
        .bubble { max-width: 80%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
        .bubble.assistant { background: rgba(30,60,110,0.6); border: 1px solid rgba(100,160,255,0.12); color: #e2eeff; border-bottom-right-radius: 4px; }
        .bubble.user { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border-bottom-left-radius: 4px; }
        .mini-avatar { width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 1px solid rgba(100,160,255,0.3); flex-shrink: 0; }
        .mini-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .typing { display: flex; gap: 4px; align-items: center; padding: 14px 18px; background: rgba(30,60,110,0.6); border: 1px solid rgba(100,160,255,0.12); border-radius: 18px; border-bottom-right-radius: 4px; }
        .dot { width: 7px; height: 7px; background: #60a5fa; border-radius: 50%; animation: bounce 1.2s infinite; }
        .dot:nth-child(2){animation-delay:0.2s} .dot:nth-child(3){animation-delay:0.4s}
        @keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.5} 30%{transform:translateY(-6px);opacity:1} }
        .quick-wrap { padding: 8px 16px 12px; display: flex; gap: 8px; overflow-x: auto; flex-direction: row-reverse; }
        .quick-wrap::-webkit-scrollbar { display: none; }
        .quick-btn { background: rgba(37,99,235,0.15); border: 1px solid rgba(100,160,255,0.2); color: #93c5fd; padding: 7px 14px; border-radius: 20px; font-size: 12.5px; cursor: pointer; white-space: nowrap; font-family: \'Cairo\', sans-serif; transition: all 0.2s; }
        .quick-btn:hover { background: rgba(37,99,235,0.3); color: #bfdbfe; transform: translateY(-1px); }
        .input-area { padding: 12px 16px 16px; background: rgba(10,22,40,0.4); border-top: 1px solid rgba(100,160,255,0.08); display: flex; gap: 10px; align-items: flex-end; }
        .input-box { flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(100,160,255,0.15); border-radius: 20px; padding: 11px 16px; color: #e2eeff; font-size: 14px; font-family: \'Cairo\', sans-serif; outline: none; resize: none; max-height: 100px; line-height: 1.5; direction: rtl; }
        .input-box::placeholder { color: rgba(150,180,255,0.4); }
        .input-box:focus { border-color: rgba(100,160,255,0.4); }
        .send-btn { width: 42px; height: 42px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
        .send-btn:hover:not(:disabled) { transform: scale(1.08); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .footer-note { text-align: center; font-size: 11px; color: rgba(150,180,255,0.35); padding-bottom: 4px; }
      `}</style>

      <div className="chat-window">
        <div className="header">
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div className="avatar"><img src={DOCTOR_PHOTO} alt="د. محمد حسام" /></div>
              <div className="online-dot" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#e2eeff", fontWeight: 700, fontSize: "15px", fontFamily: "\'Cairo\', sans-serif" }}>د. محمد حسام الدين</div>
              <div style={{ color: "#93c5fd", fontSize: "12px", marginTop: "2px", fontFamily: "\'Cairo\', sans-serif" }}>استشاري الطب النفسي وعلاج الإدمان</div>
              <a href="tel:01553002461" style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#86efac", padding: "3px 10px", borderRadius: "12px", fontSize: "12px", marginTop: "6px", textDecoration: "none" }}>📞 01553002461</a>
            </div>
            <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#86efac", fontSize: "11px", padding: "4px 10px", borderRadius: "20px", fontFamily: "\'Cairo\', sans-serif" }}>متاح الآن</div>
          </div>
        </div>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`bubble-wrap ${m.role}`}>
              {m.role === "assistant" && <div className="mini-avatar"><img src={DOCTOR_PHOTO} alt="د." /></div>}
              <div className={`bubble ${m.role}`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="bubble-wrap">
              <div className="mini-avatar"><img src={DOCTOR_PHOTO} alt="د." /></div>
              <div className="typing"><div className="dot"/><div className="dot"/><div className="dot"/></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 2 && (
          <div className="quick-wrap">
            {quickReplies.map((q, i) => (
              <button key={i} className="quick-btn" onClick={() => sendMessage(q)}>{q}</button>
            ))}
          </div>
        )}

        <div className="input-area">
          <textarea ref={inputRef} className="input-box" placeholder="اكتب سؤالك هنا..." value={input} rows={1} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} />
          <button className="send-btn" onClick={() => sendMessage()} disabled={!input.trim() || loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="footer-note">المساعد الذكي للعيادة • لا يُغني عن الاستشارة الطبية</div>
      </div>
    </div>
  );
}
