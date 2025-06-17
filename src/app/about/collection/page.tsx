import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/Collection.module.scss';
import Image from 'next/image';

export default function Collection() {
  return (
    <div className={styles.collection}>
      <Header
        nav="About 000 collection"
        link="/catalog"
        nameIcon="people"
        width={27}
        height={32}
        color="blue-2"
      />
      <main className={styles.collectionWrapper}>
        <Image
          src="/img/collection/img1.jpg"
          alt="Collection 000"
          width={1400}
          height={707}
          className={styles.collectionImgHero}
        />
        <div className={styles.collectionImgWrapper}>
          <Image src="/img/collection/img2.png" alt="Collection 000" width={1400} height={379} />
          <Image src="/img/collection/MUIRAJE.svg" alt="Collection 000" width={1236} height={496} />
          <div className={styles.collectionTextBg}>
            <div>
              MUIRAJE ABOUT DROP 000 (PRE-ORDER) TEST COLLECTION 000 “oFFICE SLEEPOVER/COZY HOME”.
            </div>
            <div>take a break. stay calm.</div>
            <div>between the number 224 and the leap year 2024.</div>
          </div>
        </div>
        <div className={styles.collectionText}>
          The test collection 000 “Office sleepover/Cozy home” by the Muiraje, is a fusion of office
          and home style, where each element can be easily mixed and matched with each other, as
          well as paired with completely contrasting pieces. This collection is designed to
          emphasize the importance of balance and tranquility, helping people feel comfortable in
          all circumstances. These are pieces that easily transition from a professional environment
          to a cozy home environment. With office sleepover/cozy home, people can confidently
          navigate through various environments without compromising on comfort. Whether it's a
          casual day out or a formal event, the brand's pieces are crafted to provide a sense of
          ease and relaxation, allowing individuals to focus on their tasks without being hindered
          by their clothing. The designs are executed with meticulous attention to detail, so that
          each piece complements the other and at the same time stands out on its own. Combining
          elements of sophistication and comfort, the Muiraje test collection serves as a reminder
          to embrace all aspects of personality and lifestyle. Whether dressing for a busy day at
          work or relaxing at home, these pieces are designed to adapt easily to any situation,
          allowing people to go through their day with confidence and ease. In a world where the
          blend of work and personal life has become the norm, the collection represents a fresh
          fusion of harmony and self-expression. In essence, Muiraje's collection empowers
          individuals to embrace every moment with confidence and comfort, knowing that they are
          dressed in clothing that supports them in every situation. It's not just about looking
          good; it's about feeling good and being able to tackle whatever life throws your way with
          ease and grace.
        </div>
        <div className={styles.collectionTextSecond}>
          take a break. stay calm.
          <br />
          muiraje
          <br />
          2024
        </div>

        <div className={styles.collectionImageWrapper}>
          <Image
            src="/img/collection/img3.jpg"
            alt="Collection 000"
            width={400}
            height={266}
            className={styles.collectionImg}
          />

          <Image
            src="/img/collection/img4.jpg"
            alt="Collection 000"
            width={400}
            height={266}
            className={styles.collectionImg}
          />

          <Image
            src="/img/collection/img5.jpg"
            alt="Collection 000"
            width={400}
            height={266}
            className={styles.collectionImg}
          />
        </div>
      </main>
    </div>
  );
}
