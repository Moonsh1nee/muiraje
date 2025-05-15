import Link from 'next/link';
import styles from '@/assets/styles/pages/notFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <>
      <title>Muiraje 404</title>
      <main className={styles.main}>
        <div className={styles.container}>
          <p>
            A computer bug has been detected in the system. You have a few options to address the
            issue.
            <br />
            Launch the IHATEMUIRAJE program to eliminate the bug. Power off your darn computer.
            <br />
            Muiraje is so 2008, nobody uses it anymore. LOL! {':>'}
            <br />
            Press any key to close the current program.
            <br />
            Perform a hard reset to reboot your computer. Please note that any unsaved work will be
            lost.
          </p>
          <div className={styles.errorWrapper}>
            <div className={styles.errorCard}>
              <span>404 Not Found</span>
              <ul>
                <li>About site</li>
                <li>coded by</li>
                <li>designed by muiraje</li>
              </ul>
            </div>
            <div className={styles.errorCard}>
              <span>404 Not Found</span>
              <ul>
                <li>About site</li>
                <li>coded by</li>
                <li>designed by muiraje</li>
              </ul>
            </div>
            <div className={styles.errorCard}>
              <span>404 Not Found</span>
              <ul>
                <li>About site</li>
                <li>coded by</li>
                <li>designed by muiraje</li>
              </ul>
            </div>
          </div>
          <p>
            An issue has been identified, and your computer system has been halted to prevent
            further damage. MUIRAJE_asshole_FAILED is the error message you are encountering. If
            this is the first time you are seeing this error screen, try restarting your computer.
            If the problem persists, follow these steps:
          </p>

          <ul className={styles.errorList}>
            <li>Verify that any recent hardware or software installations are correctly set up.</li>
            <li>
              If this is a recent installation, reach out to the manufacturer for any necessary
              Windows updates.
            </li>
            <li>
              If issues persist, consider disabling or removing any new hardware or software
              components. Additionally, disable BIOS memory options like caching or shadowing.
            </li>
            <li>
              If you need to troubleshoot in Safe Mode, restart your computer, press F8 for Advanced
              Startup Options, and choose Safe Mode.
            </li>
          </ul>

          <p>
            Technical Information:
            <br />
            * STOP: 0x00000024 (0xM2UI24JE, 0×00000224, 0x4JE8LOH8, 0x0000000) *
            <br />
            4FQ.sys - Address RADGE2024 base at 422M2224, Datestamp 2d4dd&
            <br />
            Initiating dump of physical memory
            <br />
            Physical memory dump completed
          </p>
          <p className={styles.paragraph}>
            Thank you for your patience.You may leave this screen now.Or don’t.System will wait.
          </p>

          <Link className={styles.link} href='/catalog'>Okay, let me get out of here.</Link>
        </div>
      </main>
    </>
  );
}
