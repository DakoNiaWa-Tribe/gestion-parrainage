from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "electeurs"

    id= Column(Integer, primary_key=True, nullable=False)
    numero_electeur = Column(String, nullable=False)

