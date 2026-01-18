import { Info, Github, Mail, Heart } from 'lucide-react';

const InfoPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <Info size={24} />
        <h2>정보</h2>
      </div>
      <div className="info-content">
        <div className="info-card">
          <h3>Weather App</h3>
          <p className="info-version">버전 1.0.0</p>
          <p className="info-desc">
            실시간 날씨 정보와 예보를 제공하는 날씨 애플리케이션입니다.
            현재 위치 기반의 정확한 날씨 정보를 확인하세요.
          </p>
        </div>

        <div className="info-card">
          <h4>주요 기능</h4>
          <ul className="info-features">
            <li>현재 날씨 및 체감 온도</li>
            <li>24시간 시간별 예보</li>
            <li>7일 주간 예보</li>
            <li>미세먼지 및 대기질 정보</li>
            <li>지역별 날씨 비교</li>
            <li>다크/라이트 모드 지원</li>
          </ul>
        </div>

        <div className="info-card">
          <h4>연락처</h4>
          <div className="info-links">
            <a href="#" className="info-link">
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="#" className="info-link">
              <Mail size={18} />
              <span>이메일 문의</span>
            </a>
          </div>
        </div>

        <div className="info-footer">
          <p>
            Made with <Heart size={14} className="info-heart" /> in Korea
          </p>
          <p>&copy; 2026 Weather App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
