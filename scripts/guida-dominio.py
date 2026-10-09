#!/usr/bin/env python3
"""
Guida al dominio .it per Gold Events by Salvo.
Documento PDF chiaro e completo che spiega:
1. Cos'è un dominio
2. Perché vercel.app non va bene per la produzione
3. Procedura di acquisto step-by-step
4. Costi e considerazioni
"""

import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak,
    KeepTogether, ListFlowable, ListItem, Image, HRFlowable
)
from reportlab.platypus.flowables import Flowable
from reportlab.pdfgen import canvas

# ─── Fonts ───────────────────────────────────────────────────────────────────
FONT_DIR = "/usr/share/fonts"
# Liberation Serif as Tinos replacement (Times-equivalent metrics)
pdfmetrics.registerFont(TTFont("Tinos", f"{FONT_DIR}/truetype/liberation/LiberationSerif-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Tinos-Bold", f"{FONT_DIR}/truetype/liberation/LiberationSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Tinos-Italic", f"{FONT_DIR}/truetype/liberation/LiberationSerif-Italic.ttf"))
pdfmetrics.registerFont(TTFont("Tinos-BoldItalic", f"{FONT_DIR}/truetype/liberation/LiberationSerif-BoldItalic.ttf"))
registerFontFamily("Tinos", normal="Tinos", bold="Tinos-Bold", italic="Tinos-Italic", boldItalic="Tinos-BoldItalic")

pdfmetrics.registerFont(TTFont("Carlito", f"{FONT_DIR}/truetype/english/Carlito-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Carlito-Bold", f"{FONT_DIR}/truetype/english/Carlito-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Carlito-Italic", f"{FONT_DIR}/truetype/english/Carlito-Italic.ttf"))
pdfmetrics.registerFont(TTFont("Carlito-BoldItalic", f"{FONT_DIR}/truetype/english/Carlito-BoldItalic.ttf"))
registerFontFamily("Carlito", normal="Carlito", bold="Carlito-Bold", italic="Carlito-Italic", boldItalic="Carlito-BoldItalic")

# ─── Brand Palette: Black + Satin Gold (Gold Events by Salvo) ────────────────
PAGE_BG       = colors.HexColor("#FFFFFF")
SECTION_BG    = colors.HexColor("#FAF8F2")   # very light cream
CARD_BG       = colors.HexColor("#F5F1E5")   # warmer cream
TABLE_STRIPE  = colors.HexColor("#FBF8EF")
HEADER_FILL   = colors.HexColor("#0F0F0F")   # luxury black
COVER_BLOCK   = colors.HexColor("#1C1C1C")
BORDER        = colors.HexColor("#D4AF37")   # satin gold
ICON          = colors.HexColor("#B8923C")
ACCENT        = colors.HexColor("#D4AF37")   # gold accent
TEXT_PRIMARY  = colors.HexColor("#1C1C1C")
TEXT_MUTED    = colors.HexColor("#6B6B6B")
SEM_SUCCESS   = colors.HexColor("#2E7D32")
SEM_WARNING   = colors.HexColor("#B8860B")
SEM_ERROR     = colors.HexColor("#A85048")
SEM_INFO      = colors.HexColor("#43668a")

# ─── Output path ─────────────────────────────────────────────────────────────
OUTPUT_PATH = "/home/z/my-project/download/guida-dominio-gold-events.pdf"

# ─── Styles ───────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

style_title = ParagraphStyle(
    "Title", parent=styles["Title"],
    fontName="Tinos-Bold", fontSize=28, leading=34,
    textColor=colors.white, alignment=TA_LEFT, spaceAfter=8
)
style_subtitle = ParagraphStyle(
    "Subtitle", parent=styles["Normal"],
    fontName="Tinos-Italic", fontSize=14, leading=18,
    textColor=ACCENT, alignment=TA_LEFT, spaceAfter=4
)
style_h1 = ParagraphStyle(
    "H1", parent=styles["Heading1"],
    fontName="Tinos-Bold", fontSize=20, leading=26,
    textColor=HEADER_FILL, alignment=TA_LEFT,
    spaceBefore=20, spaceAfter=10, keepWithNext=True
)
style_h2 = ParagraphStyle(
    "H2", parent=styles["Heading2"],
    fontName="Tinos-Bold", fontSize=15, leading=20,
    textColor=HEADER_FILL, alignment=TA_LEFT,
    spaceBefore=14, spaceAfter=6, keepWithNext=True
)
style_h3 = ParagraphStyle(
    "H3", parent=styles["Heading3"],
    fontName="Carlito-Bold", fontSize=11.5, leading=15,
    textColor=ACCENT, alignment=TA_LEFT,
    spaceBefore=10, spaceAfter=4, keepWithNext=True
)
style_body = ParagraphStyle(
    "Body", parent=styles["BodyText"],
    fontName="Tinos", fontSize=11, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY,
    spaceAfter=8
)
style_body_left = ParagraphStyle(
    "BodyLeft", parent=style_body, alignment=TA_LEFT
)
style_caption = ParagraphStyle(
    "Caption", parent=styles["BodyText"],
    fontName="Carlito-Italic", fontSize=9.5, leading=13,
    textColor=TEXT_MUTED, alignment=TA_LEFT, spaceAfter=6
)
style_bullet = ParagraphStyle(
    "Bullet", parent=style_body,
    fontSize=10.5, leading=16, alignment=TA_LEFT, leftIndent=14
)
style_callout = ParagraphStyle(
    "Callout", parent=style_body,
    fontName="Carlito", fontSize=10.5, leading=16,
    textColor=HEADER_FILL, alignment=TA_LEFT,
    leftIndent=10, rightIndent=10, spaceAfter=6, spaceBefore=4
)
style_quote = ParagraphStyle(
    "Quote", parent=style_body,
    fontName="Tinos-Italic", fontSize=11, leading=17,
    textColor=ACCENT, alignment=TA_LEFT,
    leftIndent=14, rightIndent=14, spaceAfter=8
)

# ─── Cover ────────────────────────────────────────────────────────────────────
class CoverPage(Flowable):
    """Full-bleed luxury cover: black background with gold accents."""
    def __init__(self, width, height):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        # Black background inside cover bounds (no overflow outside)
        c.setFillColor(HEADER_FILL)
        c.rect(0, 0, self.width, self.height, stroke=0, fill=1)

        # Gold hairline border (inset)
        c.setStrokeColor(ACCENT)
        c.setLineWidth(0.8)
        c.rect(0.6*cm, 0.6*cm, self.width - 1.2*cm, self.height - 1.2*cm, stroke=1, fill=0)

        # Top brand block
        c.setFillColor(ACCENT)
        c.setFont("Carlito-Bold", 9)
        c.drawString(1.2*cm, self.height - 1.6*cm, "GOLD EVENTS BY SALVO")
        c.setFillColor(colors.HexColor("#A1A1A1"))
        c.setFont("Carlito", 8)
        c.drawString(1.2*cm, self.height - 1.95*cm, "Adrano · Catania · Sicilia Orientale")
        c.drawRightString(self.width - 1.2*cm, self.height - 1.6*cm, "DOCUMENTO TECNICO · OTTOBRE 2026")

        # Gold hairline divider
        c.setStrokeColor(ACCENT)
        c.setLineWidth(0.4)
        c.line(1.2*cm, self.height - 2.3*cm, self.width - 1.2*cm, self.height - 2.3*cm)

        # Title block (vertical center)
        title_y = self.height / 2 + 1*cm

        c.setFillColor(ACCENT)
        c.setFont("Carlito-Bold", 9)
        c.drawString(1.2*cm, title_y + 1.5*cm, "GUIDA PRATICA · 01")

        c.setFillColor(colors.white)
        c.setFont("Tinos-Bold", 36)
        c.drawString(1.2*cm, title_y, "Il Dominio")
        c.drawString(1.2*cm, title_y - 1.3*cm, "Sito Web")

        c.setFillColor(ACCENT)
        c.setFont("Tinos-Italic", 14)
        c.drawString(1.2*cm, title_y - 2.4*cm, "Cosa e, perche serve,")
        c.drawString(1.2*cm, title_y - 2.95*cm, "come acquistarlo")

        # Summary block bottom
        c.setFillColor(colors.HexColor("#A1A1A1"))
        c.setFont("Carlito", 9.5)
        c.drawString(1.2*cm, 4.5*cm, "Cosa contiene:")
        c.setFont("Carlito", 9)
        c.drawString(1.2*cm, 4.05*cm, "-  Cosa e un dominio e perche vercel.app non basta")
        c.drawString(1.2*cm, 3.7*cm, "-  Procedura di acquisto step-by-step (Aruba)")
        c.drawString(1.2*cm, 3.35*cm, "-  Costi, requisiti e documenti necessari")
        c.drawString(1.2*cm, 3.0*cm, "-  Collegamento al sito e tempistiche")

        # Bottom gold bar
        c.setFillColor(ACCENT)
        c.rect(0, 0, self.width, 0.7*cm, stroke=0, fill=1)
        c.setFillColor(HEADER_FILL)
        c.setFont("Carlito-Bold", 8)
        c.drawString(1.2*cm, 0.25*cm, "goldeventsbysalvo.it")
        c.drawRightString(self.width - 1.2*cm, 0.25*cm, "GUIDA DOMINIO · v1.0")

    def wrap(self, aw, ah):
        return self.width, self.height


# ─── Page Header/Footer ──────────────────────────────────────────────────────
def add_page_decoration(canv, doc):
    """Subtle header + footer on body pages."""
    canv.saveState()
    w, h = A4
    # Top gold hairline
    canv.setStrokeColor(ACCENT)
    canv.setLineWidth(0.4)
    canv.line(2*cm, h - 1.5*cm, w - 2*cm, h - 1.5*cm)
    canv.setFillColor(TEXT_MUTED)
    canv.setFont("Carlito", 8)
    canv.drawString(2*cm, h - 1.3*cm, "GOLD EVENTS BY SALVO · Guida al Dominio")
    canv.drawRightString(w - 2*cm, h - 1.3*cm, f"Pag. {doc.page}")

    # Footer
    canv.setStrokeColor(ACCENT)
    canv.setLineWidth(0.4)
    canv.line(2*cm, 1.4*cm, w - 2*cm, 1.4*cm)
    canv.setFillColor(TEXT_MUTED)
    canv.setFont("Carlito-Italic", 8)
    canv.drawString(2*cm, 1*cm, "Documento tecnico · Ottobre 2026")
    canv.drawRightString(w - 2*cm, 1*cm, "goldeventsbysalvo.it")
    canv.restoreState()


# ─── Helper builders ──────────────────────────────────────────────────────────
def callout_box(title, body_html, kind="info"):
    """Coloured callout box."""
    color_map = {
        "info":    (SEM_INFO,    colors.HexColor("#EFF3F8")),
        "warning": (SEM_WARNING, colors.HexColor("#FBF6E5")),
        "success": (SEM_SUCCESS, colors.HexColor("#EDF6EE")),
        "error":   (SEM_ERROR,   colors.HexColor("#FAEFEE")),
    }
    border_color, bg_color = color_map[kind]

    title_para = Paragraph(f"<b>{title}</b>", ParagraphStyle(
        "CalloutTitle", fontName="Carlito-Bold", fontSize=10, leading=14,
        textColor=border_color, alignment=TA_LEFT, spaceAfter=4
    ))
    body_para = Paragraph(body_html, ParagraphStyle(
        "CalloutBody", fontName="Tinos", fontSize=10.5, leading=15,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT
    ))

    t = Table([[title_para], [body_para]], colWidths=[16.4*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg_color),
        ("LEFTPADDING", (0,0), (-1,-1), 12),
        ("RIGHTPADDING", (0,0), (-1,-1), 12),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LINEBEFORE", (0,0), (0,-1), 3, border_color),
        ("BOX", (0,0), (-1,-1), 0.5, colors.HexColor("#E0DCD0")),
    ]))
    return t


def comparison_table(headers, rows):
    """Comparison table with gold header."""
    data = [headers] + rows
    # Wrap cells as Paragraphs to enable text wrapping
    para_rows = []
    for r_idx, row in enumerate(data):
        para_row = []
        for c_idx, cell in enumerate(row):
            if r_idx == 0:
                p = Paragraph(f"<b>{cell}</b>", ParagraphStyle(
                    "th", fontName="Carlito-Bold", fontSize=10, leading=13,
                    textColor=colors.white, alignment=TA_LEFT
                ))
            else:
                p = Paragraph(str(cell), ParagraphStyle(
                    "td", fontName="Tinos", fontSize=10, leading=14,
                    textColor=TEXT_PRIMARY, alignment=TA_LEFT
                ))
            para_row.append(p)
        para_rows.append(para_row)

    # Column widths proportional
    n_cols = len(headers)
    if n_cols == 3:
        col_widths = [4.5*cm, 5.5*cm, 6.4*cm]
    elif n_cols == 2:
        col_widths = [5*cm, 11.4*cm]
    elif n_cols == 4:
        col_widths = [3.5*cm, 4.5*cm, 4.5*cm, 3.9*cm]
    else:
        col_widths = [16.4*cm / n_cols] * n_cols

    t = Table(para_rows, colWidths=col_widths, repeatRows=1)
    style = [
        ("BACKGROUND", (0,0), (-1,0), HEADER_FILL),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LINEBELOW", (0,0), (-1,0), 0.6, ACCENT),
        ("LINEBELOW", (0,1), (-1,-1), 0.3, colors.HexColor("#D9D4C3")),
        ("LINEAFTER", (0,1), (-2,-1), 0.3, colors.HexColor("#E5E0D0")),
    ]
    # Zebra stripes
    for i in range(1, len(para_rows)):
        if i % 2 == 0:
            style.append(("BACKGROUND", (0,i), (-1,i), TABLE_STRIPE))
    t.setStyle(TableStyle(style))
    return t


def numbered_step(num, title, body):
    """Numbered step block."""
    num_para = Paragraph(f"<b>{num}</b>", ParagraphStyle(
        "StepNum", fontName="Tinos-Bold", fontSize=22, leading=24,
        textColor=ACCENT, alignment=TA_CENTER
    ))
    title_para = Paragraph(f"<b>{title}</b>", ParagraphStyle(
        "StepTitle", fontName="Carlito-Bold", fontSize=12, leading=15,
        textColor=HEADER_FILL, alignment=TA_LEFT, spaceAfter=4
    ))
    body_paras = [Paragraph(p, ParagraphStyle(
        "StepBody", fontName="Tinos", fontSize=10.5, leading=15,
        textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=3
    )) for p in body]

    inner = [title_para] + body_paras
    t = Table([[num_para, inner]], colWidths=[1.6*cm, 14.8*cm])
    t.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (0,0), 0),
        ("RIGHTPADDING", (0,0), (0,0), 8),
        ("LEFTPADDING", (1,0), (1,0), 0),
        ("RIGHTPADDING", (1,0), (1,0), 0),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ("LINEBEFORE", (1,0), (1,0), 0.6, ACCENT),
        ("LEFTPADDING", (1,0), (1,0), 12),
    ]))
    return t


# ─── Build document ───────────────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2.2*cm, bottomMargin=2*cm,
        title="Guida al Dominio .it — Gold Events by Salvo",
        author="Z.ai",
        subject="Guida tecnica all'acquisto e configurazione del dominio",
        creator="Z.ai",
    )

    story = []

    # ─── COVER ────────────────────────────────────────────────────────────────
    # Cover must fit in normal frame (469 x 710 points after margins)
    cover_w = 469
    cover_h = 710
    story.append(CoverPage(cover_w, cover_h))
    story.append(PageBreak())

    # ─── INTRO ────────────────────────────────────────────────────────────────
    story.append(Paragraph("Premessa", style_h1))
    story.append(Paragraph(
        "Questo documento risponde a una domanda precisa: il sito di Gold Events by Salvo è "
        "attualmente raggiungibile all'indirizzo <b>goldeventsbysalvo.vercel.app</b> e ci si chiede "
        "se sia il caso di acquistare un dominio personalizzato con finale <b>.it</b>, "
        "oppure se l'indirizzo attuale sia sufficiente.",
        style_body
    ))
    story.append(Paragraph(
        "La risposta breve è: <b>sì, il dominio .it va acquistato</b>. L'indirizzo <i>vercel.app</i> "
        "è utile come anteprima temporanea, ma non è adatto a rappresentare un marchio professionale "
        "che opera nel settore eventi di lusso. Le ragioni sono sia di immagine che di natura tecnica, "
        "e vengono spiegate in dettaglio nelle pagine seguenti.",
        style_body
    ))
    story.append(Paragraph(
        "Il costo totale dell'operazione è contenuto (circa 7-10 euro all'anno) e il tempo richiesto "
        "per l'acquisto e la configurazione completa si aggira tra i 30 e i 60 minuti, DNS propagation "
        "inclusa. Il documento che segue è strutturato in modo da poter essere letto in autonomia da Salvo, "
        "anche senza competenze tecniche specifiche: ogni termine viene spiegato e ogni passaggio è "
        "descritto in modo elementare.",
        style_body
    ))

    # ─── SEZIONE 1 — COS'È UN DOMINIO ─────────────────────────────────────────
    story.append(Paragraph("1. Cos'è un dominio, in parole semplici", style_h1))

    story.append(Paragraph("L'analogia dell'indirizzo di casa", style_h2))
    story.append(Paragraph(
        "Immagina che internet sia una città. Ogni sito web è un edificio, e ogni edificio ha un "
        "indirizzo univoco che permette di trovarlo. Il <b>dominio</b> è esattamente questo: "
        "l'indirizzo pubblico del tuo sito web, quello che le persone digitano nella barra del browser "
        "per raggiungerti. Così come <i>Via Roma 42, Adrano</i> individua in modo univoco un'abitazione "
        "fisica, <i>goldeventsbysalvo.it</i> identificherebbe in modo univoco il tuo sito tra i miliardi "
        "di siti esistenti sulla rete.",
        style_body
    ))
    story.append(Paragraph(
        "Chi tecnicamente gestisce l'assegnazione degli indirizzi è il sistema DNS (Domain Name System), "
        "una sorta di elenco telefonico mondiale che associa ogni nome di dominio al server fisico dove "
        "risiedono i file del sito. Quando un utente digita <i>goldeventsbysalvo.it</i>, il DNS traduce "
        "quel nome in un indirizzo IP (una sequenza numerica tipo <i>76.76.21.21</i>) e connette il "
        "browser al server corretto. Tutto questo avviene in frazioni di secondo, in modo del tutto "
        "trasparente per l'utente finale.",
        style_body
    ))

    story.append(Paragraph("Le parti che compongono un dominio", style_h2))
    story.append(Paragraph(
        "Un dominio è composto da due o tre elementi: il <b>sottodominio</b> (opzionale, come <i>www</i>), "
        "il <b>nome di secondo livello</b> (la parte personalizzabile, come <i>goldeventsbysalvo</i>) e "
        "il <b>Top Level Domain</b> o TLD (il finale, come <i>.it</i>, <i>.com</i>, <i>.net</i>). "
        "Nel caso del tuo sito attuale, l'indirizzo <i>goldeventsbysalvo.vercel.app</i> si scompone così: "
        "<i>goldeventsbysalvo</i> è un sottodominio di terzo livello, <i>vercel</i> è il nome di secondo "
        "livello, e <i>app</i> è il TLD. In pratica, stai usando un sottodominio regalato da Vercel, "
        "non un dominio di tua proprietà.",
        style_body
    ))

    story.append(callout_box(
        "Punto chiave",
        "Avere un dominio di seconda livello (es. <b>goldeventsbysalvo.it</b>) significa possedere "
        "l'indirizzo. Avere un sottodominio su vercel.app significa prenderlo in prestito: se Vercel "
        "domani decidesse di chiudere i sottodomini gratuiti, o di cambiarne le regole, perderesti "
        "l'indirizzo da un giorno all'altro, senza poterti opporre.",
        "warning"
    ))
    story.append(Spacer(1, 8))

    # ─── SEZIONE 2 — PERCHÉ VERCEL.APP NON BASTA ──────────────────────────────
    story.append(Paragraph("2. Perché vercel.app non basta per un'attività professionale", style_h1))

    story.append(Paragraph(
        "L'URL <i>goldeventsbysalvo.vercel.app</i> è perfettamente funzionante e tecnicamente ineccepibile. "
        "Il sito carica, le animazioni vanno, i form funzionano. Ma quando questo indirizzo viene condiviso "
        "con un cliente potenziale — per iscritto su un biglietto da visita, in una chat WhatsApp, in una "
        "email di proposta economica — comunica esattamente l'idea sbagliata: quella di un progetto "
        "amatoriale, ancora in fase di prova, gestito da qualcuno che non ha investito nemmeno 10 euro "
        "per dargli un'identità propria. Per un marchio che si posiziona nel segmento eventi di lusso, "
        "questo è un danno percepito sproporzionato rispetto al costo irrisorio della soluzione.",
        style_body
    ))

    story.append(Paragraph("I cinque problemi concreti", style_h2))
    story.append(Paragraph(
        "Di seguito, i cinque motivi per cui mantenere vercel.app a lungo termine è sconsigliato, "
        "dal più evidente al più tecnico.",
        style_body
    ))

    problems = [
        ("Immagine professionale",
         "Un indirizzo con <i>vercel.app</i> finale appare come un sito amatoriale o un prototipo. "
         "I clienti del segmento lusso (matrimoni da 80+ ospiti, eventi aziendali, cerimonie) "
         "giudicano anche dai dettagli: dominio, email, grafica, tempi di risposta. Veder comparire "
         "<i>vercel.app</i> nel browser o in un link condiviso su WhatsApp fa calare immediatamente "
         "la percezione di affidabilità e investment readiness."),

        ("Memorabilità",
         "<i>goldeventsbysalvo.it</i> è facile da ricordare e da digitare. "
         "<i>goldeventsbysalvo.vercel.app</i> è lungo 32 caratteri, contiene un punto in mezzo, "
         "richiede di ricordare la parola <i>vercel</i>. Su un biglietto da visita stampato in piccolo, "
         "su un volantino, su un cartello esposto a un evento: la differenza tra i due è enorme. "
         "Una persona che sente il nome a voce deve poter ricostruire l'indirizzo a memoria."),

        ("SEO (visibilità su Google)",
         "Google indicizza anche i sottodomini vercel.app, ma li tratta come entità di secondo piano "
         "rispetto ai domini di prima livello. Le ricerche per <i>gold events salvo</i>, "
         "<i>animazione eventi adrano</i>, <i>matrimonio lusso catania</i> ottengono posizionamenti "
         "peggiori su un sottodominio gratuito. Con un dominio .it dedicato, indicizzato e curato, "
         "il sito scala più facilmente nelle posizioni di prima pagina."),

        ("Email professionale",
         "Con un dominio .it di tua proprietà puoi creare caselle email personalizzate come "
         "<i>salvo@goldeventsbysalvo.it</i> o <i>info@goldeventsbysalvo.it</i>. Queste caselle si "
         "configurano su Outlook, Gmail, o qualsiasi client e sono percepite come molto più "
         "professionali rispetto a un indirizzo <i>goldeventsbysalvo@outlook.com</i> o <i>gmail.com</i>. "
         "La mail attuale è <i>goldeventssicilyexperience@outlook.com</i>: lunga, non brandizzata sul "
         "dominio principale, e chiaramente un workaround."),

        ("Rischio di perdita",
         "Vercel è un'azienda solida, ma è un'azienda privata statunitense. Le condizioni di servizio "
         "possono cambiare, i piani gratuiti possono essere dismessi, i sottodomini possono essere "
         "revocati. Con un dominio .it intestato a Salvo, l'indirizzo rimane di sua proprietà fino "
         "al rinnovo annuale, indipendentemente da cosa accade a Vercel, al provider di hosting, "
         "o alle tecnologie sottostanti. È un rischio piccolo, ma reale, e il costo per neutralizzarlo "
         "è di 7-10 euro all'anno."),
    ]

    rows = [["Problema", "Cosa comporta in concreto"]]
    for title, desc in problems:
        rows.append([f"<b>{title}</b>", desc])
    story.append(comparison_table(rows[0], rows[1:]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Confronto diretto: situazione attuale vs. con dominio .it", style_h2))
    direct_compare = [
        ["Aspetto", "<b>vercel.app</b> (oggi)", "<b>.it</b> (con dominio)"],
        ["Indirizzo", "goldeventsbysalvo.vercel.app", "goldeventsbysalvo.it"],
        ["Lunghezza URL", "32 caratteri", "22 caratteri"],
        ["Biglietto da visita", "Sembra amatoriale", "Professionale"],
        ["Email aziendale", "goldeventssicilyexperience@outlook.com", "salvo@goldeventsbysalvo.it"],
        ["SEO Google", "Penalizzato", "Standard"],
        ["Costo annuo", "0€", "7-10€"],
        ["Proprietà", "In prestito da Vercel", "Intestato a Salvo"],
        ["Rischio perdita", "Possibile (cambio policy Vercel)", "Nessuno (fino a rinnovo)"],
    ]
    story.append(comparison_table(direct_compare[0], direct_compare[1:]))
    story.append(Spacer(1, 8))

    story.append(callout_box(
        "Verdetto",
        "vercel.app va benissimo per la fase di sviluppo, testing, e anteprima cliente durante la "
        "costruzione del sito. Per la <b>produzione</b> — cioè il sito ufficiale che i clienti visitano, "
        "che figura sui biglietti da visita, che viene condiviso in WhatsApp e email — è necessario il "
        "dominio .it. Il costo è irrilevante rispetto al beneficio percepito.",
        "success"
    ))

    # ─── SEZIONE 3 — LA PROCEDURA DI ACQUISTO ─────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("3. La procedura di acquisto, passo dopo passo", style_h1))

    story.append(Paragraph(
        "Acquistare un dominio .it è un'operazione semplice che richiede circa 10-15 minuti. "
        "L'unica cosa veramente necessaria è un codice fiscale (per i privati) o una partita IVA "
        "(per le aziende). Di seguito la procedura completa su Aruba, il registrar italiano più diffuso "
        "e consigliato per chi non ha esperienza tecnica.",
        style_body
    ))

    story.append(Paragraph("3.1 Documenti e requisiti necessari", style_h2))
    story.append(Paragraph(
        "Il registro italiano dei domini .it è gestito dal NIC (Registro del .it) presso il CNR di Pisa. "
        "Le regole di registrazione sono meno restrittive rispetto al passato, ma ci sono requisiti precisi "
        "che dipendono dalla natura del richiedente.",
        style_body
    ))

    docs_table = [
        ["Tipologia richiedente", "Documento necessario", "Note"],
        ["Privato cittadino", "Codice fiscale + documento d'identità", "Sufficiente per uso personale o commerciale minore"],
        ["Ditta individuale", "Partita IVA + codice fiscale del titolare", "Consigliato per attività commerciali"],
        ["Società (SRL, SAS, ecc.))", "Partita IVA + codice fiscale legale rappresentante", "Dominio intestato alla società"],
        ["Professionista con P.IVA", "Partita IVA + documento d'identità", "Equivalente a ditta individuale"],
        ["Straniero non residente", "Codice fiscale italiano (tramite consolato)", "Possibile ma più complesso"],
    ]
    story.append(comparison_table(docs_table[0], docs_table[1:]))
    story.append(Spacer(1, 8))

    story.append(callout_box(
        "Per Salvo nello specifico",
        "Se Salvo ha già una partita IVA per l'attività di animazione eventi (cosa consigliata vista "
        "la natura commerciale del servizio), il dominio va intestato alla partita IVA. Questo permette "
        "di scaricare la fattura del dominio come costo aziendale. Se Salvo non ha partita IVA, "
        "può comunque registrare come privato cittadino: il registrar non fa controlli sull'abbinamento "
        "dominio-attività, ma la fattura non sarà deducibile.",
        "info"
    ))

    story.append(Paragraph("3.2 Scelta del registrar (dove comprare)", style_h2))
    story.append(Paragraph(
        "Il registrar è l'azienda autorizzata che vende i domini. Ce ne sono decine in Italia, tutti "
        "vendingono lo stesso prodotto (il dominio .it è unico, è il NIC a gestirlo), ma cambiano "
        "prezzo, qualità del pannello di gestione, e supporto clienti.",
        style_body
    ))

    registrar_table = [
        ["Registrar", "Costo 1° anno", "Rinnovo", "Supporto", "Consigliato per"],
        ["Aruba.it", "6,99€", "9,99€", "Italiano, telefonico", "Principianti (consigliato)"],
        ["Register.it", "9,90€", "12,90€", "Italiano, telefonico", "Aziende con più domini"],
        ["Cloudflare", "8,03€", "8,03€", "Inglese, ticket", "Tecnici (DNS veloci)"],
        ["Namecheap", "8,50€", "10,50€", "Inglese, chat", "Chi vuole gestire DNS in autonomia"],
        ["GoDaddy", "0,99€ promo", "14,99€", "Inglese, telefonico", "Sconsigliato (rincari)"],
    ]
    story.append(comparison_table(registrar_table[0], registrar_table[1:]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Il mio consiglio è <b>Aruba</b>: è il registrar italiano più diffuso, ha un pannello di gestione "
        "in italiano, supporto telefonico in italiano, e procedure semplificate per chi non è tecnico. "
        "Il primo anno costa 6,99€, i successivi 9,99€. Cloudflare è più economico nel lungo periodo "
        "(8,03€ fissi ogni anno), ma il pannello è in inglese e richiede maggiore familiarità con DNS.",
        style_body
    ))

    story.append(Paragraph("3.3 Procedura step-by-step su Aruba", style_h2))

    story.append(numbered_step("1", "Verifica disponibilità del dominio",
        [
            "Vai su <b>www.aruba.it</b> e nella casella di ricerca in home page digita "
            "<i>goldeventsbysalvo.it</i> (senza www).",
            "Clicca su <b>Verifica</b>. Aruba ti dirà se il dominio è disponibile. Se sì, prosegui. "
            "Se è già occupato, scegline un'alternativa (es. <i>goldeventssalvo.it</i>, "
            "<i>eventibysalvo.it</i>, <i>salvopiemonte.it</i>).",
            "NON selezionare opzioni extra come hosting, email, SSL, costruzione sito: ti serve "
            "<b>solo il dominio nudo</b>. Togli tutte le spunte aggiuntive."
        ]
    ))
    story.append(Spacer(1, 6))

    story.append(numbered_step("2", "Creazione account Aruba",
        [
            "Alla fase di acquisto ti viene chiesto di creare un account Aruba (se non lo hai già).",
            "Inserisci: nome, cognome, codice fiscale, email (importante: usarne una che controlli "
            "spesso, perché lì arriveranno tutte le comunicazioni), indirizzo, telefono.",
            "Scegli una password sicura e conservala in un password manager o in un posto sicuro."
        ]
    ))
    story.append(Spacer(1, 6))

    story.append(numbered_step("3", "Inserimento dati intestatario",
        [
            "Aruba ti chiede chi è l'intestatario del dominio. Per un privato: nome, cognome, "
            "codice fiscale (devono corrispondere al documento d'identità).",
            "Per una ditta individuale o società: ragione sociale, partita IVA, sede legale. "
            "La fattura sarà intestata a questi dati.",
            "Aruba richiede anche un documento d'identità (carta d'identità o passaporto) per "
            "verificare l'identità dell'intestatario. Si carica in formato PDF o foto."
        ]
    ))
    story.append(Spacer(1, 6))

    story.append(numbered_step("4", "Pagamento",
        [
            "Il costo è di 6,99€ il primo anno (IVA inclusa). Si paga con carta di credito, "
            "PayPal, o bonifico (sconsigliato perché richiede 3-5 giorni lavorativi).",
            "Aruba emette fattura immediatamente, scaricabile dal pannello cliente.",
            "Aruba attiva il dominio entro 24-48 ore lavorative (di solito 1-2 ore)."
        ]
    ))
    story.append(Spacer(1, 6))

    story.append(numbered_step("5", "Verifica via email",
        [
            "Dopo l'acquisto, ricevi una email di conferma da Aruba con un link di attivazione.",
            "Clicca il link per confermare la tua identità.",
            "Il dominio viene attivato e comparirà nel tuo pannello cliente Aruba, accessibile da "
            "<i>clientes.aruba.it</i> con le credenziali che hai scelto al punto 2."
        ]
    ))
    story.append(Spacer(1, 8))

    story.append(callout_box(
        "Cosa NON acquistare da Aruba",
        "Aruba cercherà di venderti servizi aggiuntivi (hosting, email, SSL, backup, costruisci-sito). "
        "Tu non hai bisogno di <b>nulla di tutto ciò</b>: l'hosting è su Vercel, l'SSL è automatico, "
        "le email si possono configurare dopo (oppure restare su Outlook come ora). Rispondi NO a "
        "qualsiasi upsell e acquista <b>esclusivamente il dominio nudo</b> al costo base di 6,99€.",
        "warning"
    ))

    # ─── SEZIONE 4 — COSTI E CONSIDERAZIONI ────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("4. Costi totali, rinnovo e considerazioni economiche", style_h1))

    story.append(Paragraph("Il costo reale nel tempo", style_h2))
    story.append(Paragraph(
        "Il dominio .it ha un costo annuale ricorrente. Non è un acquisto una tantum: ogni anno va "
        "rinnovato, altrimenti il dominio torna disponibile sul mercato e qualcun altro potrebbe "
        "comprarlo. Aruba invia email di promemoria 30 giorni prima della scadenza, e il rinnovo "
        "si fa dal pannello cliente con un clic.",
        style_body
    ))

    costi_table = [
        ["Anno", "Costo Aruba", "Note"],
        ["1° anno", "6,99€", "Prezzo promozionale di lancio"],
        ["2° anno", "9,99€", "Prezzo standard di rinnovo"],
        ["3° anno", "9,99€", "Stabile nel tempo"],
        ["5 anni (totale)", "46,94€", "Media ~9,4€/anno"],
        ["10 anni (totale)", "96,89€", "Media ~9,7€/anno"],
    ]
    story.append(comparison_table(costi_table[0], costi_table[1:]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Confronto con gli altri costi del sito", style_h2))
    story.append(Paragraph(
        "Per capire se il dominio è un costo significativo, va confrontato con gli altri costi "
        "del progetto web di Gold Events by Salvo. La tabella seguente mostra il quadro completo "
        "delle spese annuali ricorrenti.",
        style_body
    ))

    totale_table = [
        ["Voce di costo", "Costo annuo", "Fornitore", "Obbligatorio?"],
        ["Hosting Vercel (piano gratuito)", "0€", "Vercel", "Sì (ma gratis)"],
        ["Dominio .it", "9,99€", "Aruba", "Sì (consigliato)"],
        ["SSL Certificate", "0€", "Vercel (auto)", "Sì (ma gratis)"],
        ["Email professionale (opzionale)", "0-12€", "Outlook gratis / Google Workspace", "No (opzionale)"],
        ["CDN ( Cloudflare)", "0€", "Cloudflare", "No (opzionale)"],
        ["TOTALE MINIMO ANNUO", "~10€", "Aruba", "—"],
    ]
    story.append(comparison_table(totale_table[0], totale_table[1:]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Come si vede, l'unico costo realmente necessario è il dominio: tutto il resto è gratuito "
        "nei piani base. Per un'attività che fattura eventi a centinaia o migliaia di euro, "
        "10€ all'anno sono una spesa irrilevante, ma il beneficio professionale è enorme.",
        style_body
    ))

    story.append(Paragraph("Cosa succede se non rinnovi", style_h2))
    story.append(Paragraph(
        "Se il dominio non viene rinnovato entro la data di scadenza, segue questo percorso:",
        style_body
    ))
    story.append(Paragraph(
        "<b>Giorno 0 — scadenza:</b> il dominio smette di funzionare. Chi digita <i>goldeventsbysalvo.it</i> "
        "vede una pagina di errore. Le email aziendali smettono di ricevere messaggi.",
        style_body_left
    ))
    story.append(Paragraph(
        "<b>Giorni 0-30 — fase di redenzione:</b> il dominio è sospeso ma ancora recuperabile pagando "
        "una penale (circa 20-30€) oltre al rinnovo normale.",
        style_body_left
    ))
    story.append(Paragraph(
        "<b>Giorni 30-60 — pending delete:</b> il dominio entra in coda per essere cancellato. "
        "Recupero ancora possibile ma costoso (50-100€).",
        style_body_left
    ))
    story.append(Paragraph(
        "<b>Dopo 60 giorni — rilascio:</b> il dominio torna disponibile pubblicamente. Chiunque può "
        "comprarlo. Se un competitor o un cybersquatter lo registra prima di te, perderesti il dominio "
        "per sempre (o dovresti ricomprarlo a prezzo maggiorato, spesso centinaia o migliaia di euro).",
        style_body_left
    ))

    story.append(callout_box(
        "Come evitare il rischio",
        "Attiva il <b>rinnovo automatico</b> nel pannello Aruba (opzione gratuita, si attiva con un clic). "
        "In questo modo, ogni anno la carta di credito viene addebitata automaticamente e il dominio "
        "non scade mai. In alternativa, Aruba invia 3 email di promemoria (60gg, 30gg, 7gg prima della "
        "scadenza): basta rispondere a una di queste per rinnovare.",
        "success"
    ))

    # ─── SEZIONE 5 — COLLEGAMENTO AL SITO ─────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("5. Come si collega il dominio al sito", style_h1))

    story.append(Paragraph(
        "Una volta acquistato il dominio, va collegato al sito che è già pubblicato su Vercel. "
        "Questa operazione tecnica è quella che richiede maggiore attenzione, ma è una procedura "
        "che si fa una volta sola e dura circa 15 minuti. Ci sono tre modalità, dalla più semplice "
        "alla più tecnica.",
        style_body
    ))

    story.append(Paragraph("Modalità A — Accesso totale (consigliata, 5 minuti)", style_h2))
    story.append(Paragraph(
        "Salvo comunica le credenziali del pannello Aruba (URL <i>clientes.aruba.it</i>, username, "
        "password). Una persona tecnica entra nel pannello, configura i record DNS per puntare a Vercel, "
        "esce. Salvo poi cambia la password per sicurezza. Vantaggi: zero lavoro per Salvo, massima "
        "precisione. Svantaggi: richiede fiducia nel dare le credenziali temporaneamente.",
        style_body
    ))

    story.append(Paragraph("Modalità B — Configurazione DNS guidata (10 minuti)", style_h2))
    story.append(Paragraph(
        "Salvo entra nel pannello Aruba da solo e inserisce due record DNS che gli vengono forniti "
        "per iscritto. La procedura è: pannello Aruba → gestione DNS → aggiungi record → inserisci "
        "i valori ricevuti. Vantaggi: nessuna condivisione di credenziali. Svantaggi: richiede "
        "10 minuti di lavoro in più per Salvo e un minimo di dimestichezza con i pannelli web.",
        style_body
    ))

    story.append(Paragraph("I record DNS da inserire (modalità B)", style_h3))
    dns_table = [
        ["Tipo", "Nome / Host", "Valore", "TTL"],
        ["A", "@ (vuoto)", "76.76.21.21", "3600"],
        ["CNAME", "www", "cname.vercel-dns.com", "3600"],
    ]
    story.append(comparison_table(dns_table[0], dns_table[1:]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Questi valori vengono forniti da Vercel quando si aggiunge il dominio nel pannello di "
        "configurazione. Vanno copiati tale e quali nel pannello Aruba, senza modifiche.",
        style_caption
    ))

    story.append(Paragraph("Modalità C — Cambio nameserver (più pulita, 24-48h)", style_h2))
    story.append(Paragraph(
        "Nel pannello Aruba, Salvo cambia i nameserver del dominio da quelli di Aruba a quelli di Vercel "
        "(<i>ns1.vercel-dns.com</i> e <i>ns2.vercel-dns.com</i>). Da quel momento Vercel gestisce "
        "tutto automaticamente. Vantaggi: configurazione totalmente automatica da Vercel. Svantaggi: "
        "propagazione DNS più lenta (24-48 ore contro i 15 minuti delle altre modalità).",
        style_body
    ))

    story.append(Paragraph("Cosa succede dopo la configurazione", style_h2))
    story.append(Paragraph(
        "Una volta inseriti i record DNS (o cambiati i nameserver), parte la <b>propagazione DNS</b>: "
        "è il tempo necessario perché i server DNS di tutto il mondo si aggiornino con la nuova "
        "associazione tra <i>goldeventsbysalvo.it</i> e i server Vercel. La propagazione è graduale: "
        "alcuni utenti vedranno il sito nuovo entro 15 minuti, altri potrebbero impiegare fino a 24 ore. "
        "Nel frattempo, sia il vecchio indirizzo <i>vercel.app</i> sia quello nuovo <i>.it</i> continuano "
        "a funzionare in parallelo.",
        style_body
    ))
    story.append(Paragraph(
        "Vercel genera automaticamente il certificato SSL (l'icona del lucchetto verde in browser) "
        "non appena i DNS puntano correttamente. Non c'è nulla da configurare manualmente: il sito "
        "diventa raggiungibile in HTTPS senza avvisi di sicurezza entro 5-10 minuti dalla propagazione.",
        style_body
    ))

    story.append(Paragraph("Aggiornamenti da fare nel sito", style_h2))
    story.append(Paragraph(
        "Una volta che il dominio è attivo, ci sono una serie di link e riferimenti nel codice del sito "
        "che vanno aggiornati dal vecchio URL <i>vercel.app</i> al nuovo <i>.it</i>. Ecco un elenco "
        "di cosa va modificato:",
        style_body
    ))
    updates_table = [
        ["Elemento", "File", "Cosa cambia"],
        ["Metadata canonical", "src/app/layout.tsx", "URL canonico per SEO"],
        ["Sitemap.xml", "src/app/sitemap.ts", "URLs indicizzate da Google"],
        ["JSON-LD structured data", "src/lib/seo/structured-data.ts", "Schema.org URLs"],
        ["Hreflang URLs", "src/lib/i18n/dictionaries.ts", "URLs multilingua"],
        ["Link interni", "src/lib/site-content.ts", "Tutti i riferimenti al dominio"],
        ["Messaggi WhatsApp/Email", "src/components/site/contact-form.tsx", "Firma messaggio pre-compilato"],
        ["Middleware routing", "src/middleware.ts", "Redirect e regole routing"],
        ["robots.txt", "src/app/robots.ts (se presente)", "Crawl directives"],
    ]
    story.append(comparison_table(updates_table[0], updates_table[1:]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Tutti questi aggiornamenti vengono fatti in automatico dal sistema di generazione del sito. "
        "Salvo non deve preoccuparsi di modificare il codice manualmente: basta comunicare il nuovo "
        "dominio e la procedura di aggiornamento è completamente automatizzata.",
        style_body
    ))

    # ─── SEZIONE 6 — DECISIONE FINALE ─────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("6. Decisione finale: va fatto?", style_h1))

    story.append(Paragraph("Sintesi dei pro e contro", style_h2))
    story.append(Paragraph(
        "Per prendere una decisione consapevole, ecco il quadro completo dei vantaggi e degli svantaggi "
        "dell'acquisto del dominio .it, rispetto al mantenimento del solo indirizzo vercel.app.",
        style_body
    ))

    decision_table = [
        ["Aspetto", "Acquistare il .it", "Mantenere vercel.app"],
        ["Costo annuo", "9,99€", "0€"],
        ["Immagine professionale", "Massima", "Penalizzata"],
        ["Memorabilità URL", "Alta", "Bassa"],
        ["SEO Google", "Standard", "Penalizzato"],
        ["Email personalizzata", "Possibile (es. salvo@goldeventsbysalvo.it)", "Impossibile"],
        ["Proprietà dell'indirizzo", "Sì, intestato a Salvo", "No, in prestito da Vercel"],
        ["Rischio perdita", "Nessuno (fino a rinnovo)", "Possibile se Vercel cambia policy"],
        ["Tempo per configurare", "30-60 min una tantum", "0"],
        ["Complessità gestione", "Bassa (rinnovo automatico)", "Nulla"],
    ]
    story.append(comparison_table(decision_table[0], decision_table[1:]))
    story.append(Spacer(1, 8))

    story.append(callout_box(
        "Verdetto finale",
        "Il dominio .it <b>va acquistato senza esitazione</b>. Il costo (9,99€/anno) è irrilevante "
        "rispetto al beneficio in termini di immagine professionale, memorabilità, SEO, e sicurezza "
        "giuridica sull'indirizzo. Per un'attività di eventi che si rivolge a clienti del segmento "
        "lusso, mantenere un indirizzo vercel.app è un autogol di immagine sproporzionato rispetto "
        "al costo della soluzione. La procedura di acquisto richiede 10 minuti, la configurazione "
        "tecnica altri 15-30 minuti, e da quel momento il sito è raggiungibile a un indirizzo "
        "professionale, memorizzabile, brandizzato, di proprietà esclusiva di Salvo.",
        "success"
    ))

    story.append(Paragraph("Prossimi passi concreti", style_h2))
    story.append(Paragraph(
        "Per procedere, ecco la checklist operativa per Salvo, dalla decisione al sito attivo:",
        style_body
    ))

    checklist = [
        ("Decidere il nome dominio", "Confermare <i>goldeventsbysalvo.it</i> o scegliere un'alternativa. Verifica disponibilità su aruba.it senza comprare."),
        ("Verificare documenti", "Codice fiscale (privato) o partita IVA (azienda). Documento d'identità in formato PDF o foto nitida."),
        ("Acquistare su Aruba", "10 minuti: ricerca dominio → aggiungi al carrello (solo dominio nudo) → crea account → inserisci dati → paga 6,99€."),
        ("Attivazione", "Aruba invia email con link di conferma. Clicca il link. Dominio attivo entro 24-48h (di solito 1-2h)."),
        ("Salvare credenziali", "Conservare email Aruba, username, password, codice cliente in un posto sicuro (password manager consigliato)."),
        ("Comunicare dominio attivo", "Avvisare il tecnico che il dominio è attivo, fornendo accesso al pannello (modalità A) o richiedendo istruzioni DNS (modalità B)."),
        ("Configurazione DNS", "Il tecnico configura i record DNS per puntare a Vercel. Si fa in 5-15 minuti."),
        ("Attendere propagazione", "DNS propagation: 15 minuti - 24 ore. Gradualmente il nuovo indirizzo diventa raggiungibile worldwide."),
        ("Verifica finale", "Test end-to-end: digitare <i>goldeventsbysalvo.it</i> nel browser, verificare HTTPS verde, navigare, compilare il form di contatto."),
        ("Attivare rinnovo automatico", "Nel pannello Aruba, attivare l'opzione rinnovo automatico per non rischiare la scadenza del dominio negli anni successivi."),
    ]

    for i, (titolo, desc) in enumerate(checklist, 1):
        step = numbered_step(str(i), titolo, [desc])
        story.append(step)
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 12))

    story.append(HRFlowable(width="100%", thickness=0.6, color=ACCENT, spaceBefore=8, spaceAfter=8))

    story.append(Paragraph(
        "<i>Per qualsiasi dubbio sulla procedura, Salvo può fare riferimento al tecnico che ha sviluppato "
        "il sito. La parte tecnica di configurazione è completamente gestibile da remoto, senza che Salvo "
        "debba fare nulla di tecnico: la sua unica responsabilità è l'acquisto del dominio su Aruba e "
        "la comunicazione delle credenziali o dei record DNS da inserire.</i>",
        style_quote
    ))

    # ─── BUILD ────────────────────────────────────────────────────────────────
    doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=add_page_decoration)
    print(f"✓ PDF generato: {OUTPUT_PATH}")
    print(f"  Dimensione: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


if __name__ == "__main__":
    build()
